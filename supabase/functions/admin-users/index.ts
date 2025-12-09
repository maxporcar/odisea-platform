import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Whitelist of allowed fields for profile updates
const ALLOWED_UPDATE_FIELDS = ['is_premium', 'full_name', 'country', 'language', 'institution_id'] as const;
type AllowedField = typeof ALLOWED_UPDATE_FIELDS[number];

// Validate and sanitize the update body
function validateUpdateBody(body: Record<string, unknown>): Partial<Record<AllowedField, unknown>> {
  const validatedBody: Partial<Record<AllowedField, unknown>> = {};
  
  for (const field of ALLOWED_UPDATE_FIELDS) {
    if (field in body) {
      const value = body[field];
      
      // Type validation for each field
      switch (field) {
        case 'is_premium':
          if (typeof value === 'boolean') {
            validatedBody[field] = value;
          }
          break;
        case 'full_name':
        case 'country':
        case 'language':
          if (typeof value === 'string' && value.length <= 255) {
            validatedBody[field] = value.trim();
          }
          break;
        case 'institution_id':
          if (value === null || (typeof value === 'string' && value.length <= 36)) {
            validatedBody[field] = value;
          }
          break;
      }
    }
  }
  
  return validatedBody;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Verify admin access
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authorization header missing");
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;

    if (!user) {
      throw new Error("User not authenticated");
    }

    // Check admin role using the new has_role function via RPC
    const { data: hasAdminRole, error: roleError } = await supabaseAdmin.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin'
    });

    if (roleError) {
      console.error("Role check error:", roleError);
      throw new Error("Failed to verify admin role");
    }

    if (!hasAdminRole) {
      throw new Error("Access denied - Admin only");
    }

    console.log(`Admin access verified for user: ${user.id}`);

    if (req.method === "GET") {
      // Get all users with their auth data
      const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers();
      
      if (authError) {
        console.error("Auth users error:", authError);
        throw new Error("Failed to fetch users");
      }
      
      const { data: profiles, error: profilesError } = await supabaseAdmin
        .from("profiles")
        .select(`
          *,
          institution:institutions(name, domain)
        `);

      if (profilesError) {
        console.error("Profiles error:", profilesError);
        throw new Error("Failed to fetch profiles");
      }

      // Get user roles
      const { data: userRoles, error: rolesError } = await supabaseAdmin
        .from("user_roles")
        .select("user_id, role");

      if (rolesError) {
        console.error("User roles error:", rolesError);
      }

      // Merge auth and profile data
      const users = authUsers.users.map(authUser => {
        const userProfile = profiles?.find(p => p.id === authUser.id);
        const roles = userRoles?.filter(r => r.user_id === authUser.id).map(r => r.role) || [];
        return {
          id: authUser.id,
          email: authUser.email,
          created_at: authUser.created_at,
          is_admin: roles.includes('admin'),
          ...userProfile,
          roles,
        };
      });

      return new Response(
        JSON.stringify({ users }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    if (req.method === "PATCH") {
      const url = new URL(req.url);
      const userId = url.pathname.split("/").pop();
      
      if (!userId || userId.length !== 36) {
        throw new Error("Invalid user ID");
      }
      
      const body = await req.json();
      
      // Validate and sanitize the update body
      const validatedBody = validateUpdateBody(body);
      
      if (Object.keys(validatedBody).length === 0) {
        throw new Error("No valid fields to update");
      }

      console.log(`Updating user ${userId} with fields:`, Object.keys(validatedBody));

      const { error } = await supabaseAdmin
        .from("profiles")
        .update(validatedBody)
        .eq("id", userId);

      if (error) {
        console.error("Update error:", error);
        throw error;
      }

      // Handle admin role separately via user_roles table
      if ('is_admin' in body && typeof body.is_admin === 'boolean') {
        if (body.is_admin) {
          // Add admin role
          const { error: roleError } = await supabaseAdmin
            .from("user_roles")
            .upsert({ user_id: userId, role: 'admin' }, { onConflict: 'user_id,role' });
          
          if (roleError) {
            console.error("Add role error:", roleError);
          }
        } else {
          // Remove admin role
          const { error: roleError } = await supabaseAdmin
            .from("user_roles")
            .delete()
            .eq("user_id", userId)
            .eq("role", "admin");
          
          if (roleError) {
            console.error("Remove role error:", roleError);
          }
        }
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    return new Response("Method not allowed", { status: 405 });
  } catch (error) {
    console.error("Admin users error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

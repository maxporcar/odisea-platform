
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Webhook received");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey || !webhookSecret) {
      throw new Error("Missing Stripe configuration");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Use service role key for database operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      throw new Error("No stripe signature found");
    }

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    logStep("Webhook verified", { eventType: event.type });

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId, subscriptionType, institutionName, institutionDomain } = session.metadata || {};
        
        logStep("Processing checkout completion", { 
          sessionId: session.id, 
          userId, 
          subscriptionType,
          institutionName,
          institutionDomain
        });

        if (!userId) {
          throw new Error("No userId in session metadata");
        }

        // Get customer email
        const customer = await stripe.customers.retrieve(session.customer as string);
        const customerEmail = typeof customer === 'object' ? customer.email : null;

        if (!customerEmail) {
          throw new Error("No customer email found");
        }

        if (subscriptionType === "institution" && institutionName && institutionDomain) {
          // Handle institution subscription
          
          // Create or update institution
          const { data: institution, error: institutionError } = await supabaseClient
            .from("institutions")
            .upsert({
              name: institutionName,
              domain: institutionDomain,
              active_subscription: true,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              updated_at: new Date().toISOString()
            }, { onConflict: 'domain' })
            .select()
            .single();

          if (institutionError) {
            logStep("Institution upsert error", { error: institutionError });
            throw institutionError;
          }

          logStep("Institution created/updated", { institutionId: institution.id });

          // Update all users with this domain to premium
          const { error: profilesError } = await supabaseClient
            .from("profiles")
            .update({ 
              institution_id: institution.id,
              is_premium: true,
              updated_at: new Date().toISOString()
            })
            .eq("id", userId);

          if (profilesError) {
            logStep("Profile update error", { error: profilesError });
            throw profilesError;
          }

          // Update subscribers table
          await supabaseClient
            .from("subscribers")
            .upsert({
              user_id: userId,
              email: customerEmail,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              subscribed: true,
              subscription_type: "institution",
              subscription_tier: "Institution",
              institution_id: institution.id,
              updated_at: new Date().toISOString()
            }, { onConflict: 'email' });

        } else {
          // Handle individual subscription
          const { error: profileError } = await supabaseClient
            .from("profiles")
            .update({ 
              is_premium: true,
              updated_at: new Date().toISOString()
            })
            .eq("id", userId);

          if (profileError) {
            logStep("Individual profile update error", { error: profileError });
            throw profileError;
          }

          // Update subscribers table
          await supabaseClient
            .from("subscribers")
            .upsert({
              user_id: userId,
              email: customerEmail,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              subscribed: true,
              subscription_type: "individual",
              subscription_tier: "Individual",
              updated_at: new Date().toISOString()
            }, { onConflict: 'email' });
        }

        logStep("Subscription activated successfully");
        break;
      }

      case "customer.subscription.deleted":
      case "invoice.payment_failed": {
        const subscription = event.data.object as Stripe.Subscription;
        logStep("Processing subscription cancellation", { subscriptionId: subscription.id });

        // Find and update subscriber
        const { data: subscriber, error: findError } = await supabaseClient
          .from("subscribers")
          .select("*")
          .eq("stripe_subscription_id", subscription.id)
          .single();

        if (findError || !subscriber) {
          logStep("Subscriber not found", { subscriptionId: subscription.id });
          break;
        }

        // Update subscriber status
        await supabaseClient
          .from("subscribers")
          .update({ 
            subscribed: false,
            updated_at: new Date().toISOString()
          })
          .eq("id", subscriber.id);

        // Update profile premium status
        if (subscriber.user_id) {
          await supabaseClient
            .from("profiles")
            .update({ 
              is_premium: false,
              updated_at: new Date().toISOString()
            })
            .eq("id", subscriber.user_id);
        }

        // If it's an institution subscription, deactivate the institution
        if (subscriber.subscription_type === "institution" && subscriber.institution_id) {
          await supabaseClient
            .from("institutions")
            .update({ 
              active_subscription: false,
              updated_at: new Date().toISOString()
            })
            .eq("id", subscriber.institution_id);
        }

        logStep("Subscription deactivated successfully");
        break;
      }

      default:
        logStep("Unhandled event type", { eventType: event.type });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in stripe-webhook", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

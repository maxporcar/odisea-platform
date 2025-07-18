
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const signature = req.headers.get("stripe-signature");
    const body = await req.text();

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature!,
        Deno.env.get("STRIPE_WEBHOOK_SECRET") || ""
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return new Response("Invalid signature", { status: 400 });
    }

    console.log("Processing webhook event:", event.type);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const { userId, subscriptionType, institutionId } = session.metadata || {};

        if (subscriptionType === "institution" && institutionId) {
          // Handle institution subscription
          await supabaseAdmin
            .from("institutions")
            .update({ active_subscription: true })
            .eq("id", institutionId);

          // Update all users in this institution
          await supabaseAdmin
            .from("profiles")
            .update({ is_premium: true })
            .eq("institution_id", institutionId);

        } else if (userId) {
          // Handle individual subscription
          await supabaseAdmin
            .from("subscribers")
            .upsert({
              user_id: userId,
              stripe_customer_id: session.customer,
              stripe_subscription_id: session.subscription,
              subscribed: true,
              subscription_type: subscriptionType || "individual",
              subscription_tier: subscriptionType === "individual" ? "Individual" : "Institution",
            });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        
        // Find and update subscriber
        const { data: subscriber } = await supabaseAdmin
          .from("subscribers")
          .select("*")
          .eq("stripe_subscription_id", subscription.id)
          .single();

        if (subscriber) {
          await supabaseAdmin
            .from("subscribers")
            .update({ subscribed: false, subscription_end: new Date().toISOString() })
            .eq("user_id", subscriber.user_id);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        
        if (invoice.subscription) {
          const { data: subscriber } = await supabaseAdmin
            .from("subscribers")
            .select("*")
            .eq("stripe_subscription_id", invoice.subscription)
            .single();

          if (subscriber) {
            await supabaseAdmin
              .from("subscribers")
              .update({ subscribed: false })
              .eq("user_id", subscriber.user_id);
          }
        }
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

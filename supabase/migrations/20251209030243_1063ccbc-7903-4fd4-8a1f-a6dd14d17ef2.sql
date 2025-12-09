-- Drop existing policies on subscribers table
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.subscribers;
DROP POLICY IF EXISTS "Service role can manage all subscriptions" ON public.subscribers;
DROP POLICY IF EXISTS "Anon users cannot access subscribers" ON public.subscribers;

-- Ensure RLS is enabled and forced
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers FORCE ROW LEVEL SECURITY;

-- Create policy for authenticated users to view only their own subscription (by user_id only, not email)
CREATE POLICY "Users can view their own subscription"
ON public.subscribers
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Restrict service role to specific operations (INSERT, UPDATE, DELETE) rather than ALL
-- This is needed for Stripe webhooks to manage subscriptions
CREATE POLICY "Service role can insert subscriptions"
ON public.subscribers
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Service role can update subscriptions"
ON public.subscribers
FOR UPDATE
TO service_role
USING (true);

CREATE POLICY "Service role can delete subscriptions"
ON public.subscribers
FOR DELETE
TO service_role
USING (true);

-- Explicitly deny anonymous users
CREATE POLICY "Anon users cannot access subscribers"
ON public.subscribers
FOR SELECT
TO anon
USING (false);
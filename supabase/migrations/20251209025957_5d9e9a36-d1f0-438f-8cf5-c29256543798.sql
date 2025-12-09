-- Drop existing policies on subscribers table
DROP POLICY IF EXISTS "Service role can manage subscriptions" ON public.subscribers;
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.subscribers;

-- Ensure RLS is enabled
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owner as well (prevents bypassing RLS)
ALTER TABLE public.subscribers FORCE ROW LEVEL SECURITY;

-- Create policy for users to view only their own subscription
CREATE POLICY "Users can view their own subscription"
ON public.subscribers
FOR SELECT
TO authenticated
USING ((user_id = auth.uid()) OR (email = auth.email()));

-- Create policy for service role to manage all subscriptions (for webhooks, etc.)
CREATE POLICY "Service role can manage all subscriptions"
ON public.subscribers
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Ensure anon users cannot access any data
CREATE POLICY "Anon users cannot access subscribers"
ON public.subscribers
FOR SELECT
TO anon
USING (false);
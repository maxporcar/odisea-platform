
-- Ensure pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

BEGIN;

-- Create institutions table for institution-level subscriptions
CREATE TABLE IF NOT EXISTS public.institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT UNIQUE NOT NULL,
  active_subscription BOOLEAN DEFAULT FALSE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add institution reference and admin role to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS institution_id UUID REFERENCES public.institutions(id);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Enable RLS on institutions table
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

-- Create specific RLS policies for institutions
CREATE POLICY "Institutions are viewable by everyone" ON public.institutions
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert institutions" ON public.institutions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.is_admin = true
    )
  );

CREATE POLICY "Admins can update institutions" ON public.institutions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.is_admin = true
    )
  );

CREATE POLICY "Admins can delete institutions" ON public.institutions
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.is_admin = true
    )
  );

-- Create RLS policy for admin access to profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM public.profiles admin_profile
      WHERE admin_profile.id = auth.uid() AND admin_profile.is_admin = true
    )
  );

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM public.profiles admin_profile
      WHERE admin_profile.id = auth.uid() AND admin_profile.is_admin = true
    )
  );

-- Create subscribers table for Stripe subscription tracking
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_type TEXT CHECK (subscription_type IN ('individual', 'institution')),
  subscription_tier TEXT,
  subscription_end TIMESTAMPTZ,
  institution_id UUID REFERENCES public.institutions(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on subscribers
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create specific RLS policies for subscribers
CREATE POLICY "Users can view their own subscription" ON public.subscribers
  FOR SELECT USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "Service role can manage subscriptions" ON public.subscribers
  FOR ALL USING (auth.role() = 'service_role');

-- Function to handle domain-based institution assignment
CREATE OR REPLACE FUNCTION public.assign_institution_by_domain()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_domain TEXT;
  institution_record public.institutions%ROWTYPE;
BEGIN
  -- Extract domain from email
  user_domain := split_part(NEW.email, '@', 2);
  
  -- Check if domain matches an active institution
  SELECT * INTO institution_record
  FROM public.institutions
  WHERE domain = user_domain AND active_subscription = true;
  
  -- If institution found, assign user to it and grant premium
  IF FOUND THEN
    UPDATE public.profiles
    SET 
      institution_id = institution_record.id,
      is_premium = true,
      updated_at = NOW()
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for automatic institution assignment
DROP TRIGGER IF EXISTS on_auth_user_institution_assignment ON auth.users;
CREATE TRIGGER on_auth_user_institution_assignment
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.assign_institution_by_domain();

COMMIT;

-- Drop the SECURITY DEFINER view and recreate as a regular view
DROP VIEW IF EXISTS public.institutions_public;

-- Fix remaining function search_paths
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.assign_institution_by_domain()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
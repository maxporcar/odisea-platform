-- Create user account for Flavie Tandar
-- Note: This creates the auth user and profile, then adds a trip

-- First, let's create a user in auth.users (this would normally be done via supabase.auth.signUp)
-- Since we can't directly insert into auth.users from SQL, we'll create the profile directly
-- and assume the auth user will be created separately

-- Insert the profile for Flavie Tandar
INSERT INTO public.profiles (
  id, 
  full_name, 
  country, 
  language, 
  is_premium
) VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479', -- UUID for Flavie
  'Flavie Tandar',
  'France',
  'fr',
  true
);

-- Insert the trip to Mérida, Mexico
INSERT INTO public.user_trips (
  user_id,
  destination_name,
  country_id,
  departure_date
) VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'Mérida, Mexique',
  'mexico',
  '2024-09-01'
);
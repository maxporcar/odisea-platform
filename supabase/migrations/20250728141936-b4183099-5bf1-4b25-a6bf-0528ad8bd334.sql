-- Update the user to mark email as confirmed
UPDATE auth.users 
SET email_confirmed_at = NOW(), 
    raw_user_meta_data = jsonb_build_object('full_name', 'Flavie Tandar'),
    updated_at = NOW()
WHERE email = 'flavie.tandar@gmail.com';

-- Update or insert the profile to ensure it's complete
INSERT INTO public.profiles (
  id, 
  full_name, 
  country, 
  language, 
  is_premium
) 
SELECT 
  id,
  'Flavie Tandar',
  'France',
  'fr',
  true
FROM auth.users 
WHERE email = 'flavie.tandar@gmail.com'
ON CONFLICT (id) 
DO UPDATE SET
  full_name = 'Flavie Tandar',
  country = 'France',
  language = 'fr',
  is_premium = true;

-- Create the trip for Mérida
INSERT INTO public.user_trips (
  user_id,
  destination_name,
  country_id,
  departure_date
)
SELECT 
  u.id,
  'Mérida, Mexique',
  'mexico',
  '2024-09-01'
FROM auth.users u
WHERE u.email = 'flavie.tandar@gmail.com'
AND NOT EXISTS (
  SELECT 1 FROM public.user_trips ut 
  WHERE ut.user_id = u.id 
  AND ut.destination_name = 'Mérida, Mexique'
);
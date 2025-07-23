
-- Grant premium features to maxporcar@gmail.com
UPDATE public.profiles 
SET is_premium = true, updated_at = now()
WHERE id = (
  SELECT id 
  FROM auth.users 
  WHERE email = 'maxporcar@gmail.com'
);

-- Drop the existing admin policies on institutions table that use profiles.is_admin
DROP POLICY IF EXISTS "Admins can delete institutions" ON public.institutions;
DROP POLICY IF EXISTS "Admins can insert institutions" ON public.institutions;
DROP POLICY IF EXISTS "Admins can update institutions" ON public.institutions;

-- Recreate admin policies using has_role() function to prevent recursion
CREATE POLICY "Admins can delete institutions" 
ON public.institutions 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert institutions" 
ON public.institutions 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update institutions" 
ON public.institutions 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));
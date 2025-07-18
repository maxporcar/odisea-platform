
-- Enable RLS for countries_sheets table
ALTER TABLE public.countries_sheets ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to view countries_sheets data
CREATE POLICY "Countries sheets are viewable by everyone" 
  ON public.countries_sheets 
  FOR SELECT 
  USING (true);

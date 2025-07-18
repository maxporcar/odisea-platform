-- Update countries table to include all required markdown columns
ALTER TABLE public.countries 
ADD COLUMN IF NOT EXISTS slug TEXT,
ADD COLUMN IF NOT EXISTS overview_md TEXT,
ADD COLUMN IF NOT EXISTS big_cities_vs_small_towns_md TEXT,
ADD COLUMN IF NOT EXISTS culture_md TEXT,
ADD COLUMN IF NOT EXISTS dos_and_donts_md TEXT,
ADD COLUMN IF NOT EXISTS visa_information_md TEXT,
ADD COLUMN IF NOT EXISTS life_activities_travel_md TEXT,
ADD COLUMN IF NOT EXISTS medical_md TEXT,
ADD COLUMN IF NOT EXISTS student_benefits_scholarships_md TEXT;

-- Update cities table to include all required markdown columns
ALTER TABLE public.cities 
ADD COLUMN IF NOT EXISTS country_slug TEXT,
ADD COLUMN IF NOT EXISTS climate_md TEXT,
ADD COLUMN IF NOT EXISTS cost_of_living_md TEXT,
ADD COLUMN IF NOT EXISTS safety_md TEXT,
ADD COLUMN IF NOT EXISTS rent_md TEXT,
ADD COLUMN IF NOT EXISTS events_md TEXT,
ADD COLUMN IF NOT EXISTS social_md TEXT,
ADD COLUMN IF NOT EXISTS universities_md TEXT;
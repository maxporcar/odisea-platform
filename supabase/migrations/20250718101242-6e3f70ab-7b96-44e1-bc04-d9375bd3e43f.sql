
-- Actualizar tabla countries para incluir todas las columnas markdown
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

-- Hacer slug único
ALTER TABLE public.countries 
ADD CONSTRAINT countries_slug_unique UNIQUE (slug);

-- Crear tabla cities con todas las columnas markdown
CREATE TABLE IF NOT EXISTS public.cities_new (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id TEXT NOT NULL REFERENCES public.countries(id),
  country_slug TEXT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  climate_md TEXT,
  cost_of_living_md TEXT,
  safety_md TEXT,
  rent_md TEXT,
  events_md TEXT,
  social_md TEXT,
  universities_md TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(slug),
  UNIQUE(country_slug, name)
);

-- Migrar datos existentes de cities si los hay
INSERT INTO public.cities_new (country_id, name, slug, created_at, updated_at)
SELECT country_id, name, COALESCE(slug, lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'))), created_at, updated_at
FROM public.cities
ON CONFLICT (slug) DO NOTHING;

-- Eliminar tabla cities antigua y renombrar la nueva
DROP TABLE IF EXISTS public.cities CASCADE;
ALTER TABLE public.cities_new RENAME TO cities;

-- Habilitar RLS en cities
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;

-- Crear política RLS para cities
CREATE POLICY "Cities are viewable by everyone" 
  ON public.cities FOR SELECT 
  USING (true);

-- Crear trigger para updated_at en cities
CREATE TRIGGER update_cities_updated_at
  BEFORE UPDATE ON public.cities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Recrear foreign keys para universities si existe
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'universities') THEN
    ALTER TABLE public.universities 
    ADD CONSTRAINT universities_city_id_fkey 
    FOREIGN KEY (city_id) REFERENCES public.cities(id);
  END IF;
END $$;

-- Ensure pgcrypto extension exists for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Add image_url columns to tables
ALTER TABLE public.countries ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.cities ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.universities ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add slug column to cities table for English routing
ALTER TABLE public.cities ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Create index on slug for better performance
CREATE INDEX IF NOT EXISTS idx_cities_slug ON public.cities(slug);

-- Generate basic slugs with comprehensive accent replacement
UPDATE public.cities 
SET slug = LOWER(
  REPLACE(
    REPLACE(
      REPLACE(
        REPLACE(
          REPLACE(
            REPLACE(
              REPLACE(
                REPLACE(
                  REPLACE(
                    REPLACE(
                      REPLACE(
                        REPLACE(name, 'ñ', 'n'),
                        'á', 'a'),
                      'é', 'e'),
                    'í', 'i'),
                  'ó', 'o'),
                'ú', 'u'),
              'Á', 'a'),
            'É', 'e'),
          'Í', 'i'),
        'Ó', 'o'),
      'Ú', 'u'),
    ' ', '-')
  )
WHERE slug IS NULL;
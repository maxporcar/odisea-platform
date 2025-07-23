
BEGIN;

-- Ensure pgcrypto for UUIDs
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Add unique constraints for idempotency (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'uq_templates_category_title'
    ) THEN
        ALTER TABLE public.checklist_templates 
        ADD CONSTRAINT uq_templates_category_title UNIQUE(category, title);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'uq_items_template_title'
    ) THEN
        ALTER TABLE public.checklist_items 
        ADD CONSTRAINT uq_items_template_title UNIQUE(template_id, title);
    END IF;
END $$;

-- Clear existing data to avoid conflicts (optional - remove if you want to keep existing data)
DELETE FROM public.checklist_items;
DELETE FROM public.checklist_templates;

-- Insert templates (idempotent)
INSERT INTO public.checklist_templates (id, category, title, description, order_index)
VALUES
  (gen_random_uuid(), 'travel', '3 Months Before', 'Essential tasks to complete 3 months before departure', 1),
  (gen_random_uuid(), 'travel', '1-2 Months Before', 'Important preparations in the final months', 2),
  (gen_random_uuid(), 'travel', '2 Weeks Before', 'Last-minute preparations before travel', 3),
  (gen_random_uuid(), 'travel', 'Travel Day', 'Tasks for your departure day', 4),
  (gen_random_uuid(), 'travel', 'First Week Abroad', 'Essential tasks upon arrival', 5),
  (gen_random_uuid(), 'luggage', 'Packing Your Suitcase', 'Complete packing checklist', 1)
ON CONFLICT (category, title) DO NOTHING;

-- Insert checklist items for "3 Months Before"
INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Research visa requirements', 'Check what type of visa you need for your destination', 1
FROM public.checklist_templates t WHERE t.title = '3 Months Before'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Apply for student visa', 'Submit your visa application with all required documents', 2
FROM public.checklist_templates t WHERE t.title = '3 Months Before'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Research accommodation options', 'Look into student housing, apartments, or homestays', 3
FROM public.checklist_templates t WHERE t.title = '3 Months Before'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Apply for international student insurance', 'Get health insurance coverage for your stay', 4
FROM public.checklist_templates t WHERE t.title = '3 Months Before'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Book accommodation', 'Secure your housing for the first few months', 5
FROM public.checklist_templates t WHERE t.title = '3 Months Before'
ON CONFLICT (template_id, title) DO NOTHING;

-- Insert checklist items for "1-2 Months Before"
INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Book flight tickets', 'Reserve your flights to your destination', 1
FROM public.checklist_templates t WHERE t.title = '1-2 Months Before'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Open international bank account', 'Set up banking for your destination country', 2
FROM public.checklist_templates t WHERE t.title = '1-2 Months Before'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Get international driving permit', 'Apply for IDP if you plan to drive', 3
FROM public.checklist_templates t WHERE t.title = '1-2 Months Before'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Research local culture and customs', 'Learn about your destination culture', 4
FROM public.checklist_templates t WHERE t.title = '1-2 Months Before'
ON CONFLICT (template_id, title) DO NOTHING;

-- Insert checklist items for "2 Weeks Before"
INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Confirm flight details', 'Check-in online and confirm departure times', 1
FROM public.checklist_templates t WHERE t.title = '2 Weeks Before'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Pack essentials', 'Pack important documents and immediate needs', 2
FROM public.checklist_templates t WHERE t.title = '2 Weeks Before'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Notify your bank of travel', 'Inform banks about international travel', 3
FROM public.checklist_templates t WHERE t.title = '2 Weeks Before'
ON CONFLICT (template_id, title) DO NOTHING;

-- Insert checklist items for "Travel Day"
INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Arrive at airport early', 'Get to the airport 3 hours before international flights', 1
FROM public.checklist_templates t WHERE t.title = 'Travel Day'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Keep important documents accessible', 'Have passport, visa, and tickets easily accessible', 2
FROM public.checklist_templates t WHERE t.title = 'Travel Day'
ON CONFLICT (template_id, title) DO NOTHING;

-- Insert checklist items for "First Week Abroad"
INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Register with local authorities', 'Complete any required local registration', 1
FROM public.checklist_templates t WHERE t.title = 'First Week Abroad'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Get local SIM card', 'Set up local phone service', 2
FROM public.checklist_templates t WHERE t.title = 'First Week Abroad'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Open local bank account', 'Set up local banking services', 3
FROM public.checklist_templates t WHERE t.title = 'First Week Abroad'
ON CONFLICT (template_id, title) DO NOTHING;

-- Insert checklist items for "Packing Your Suitcase"
INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Check airline baggage rules', 'Review weight limits and restricted items', 1
FROM public.checklist_templates t WHERE t.title = 'Packing Your Suitcase'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Pack travel adapters', 'Bring power adapters for your destination', 2
FROM public.checklist_templates t WHERE t.title = 'Packing Your Suitcase'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Bring medical documents', 'Pack prescriptions and medical records', 3
FROM public.checklist_templates t WHERE t.title = 'Packing Your Suitcase'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Prepare clothing for local climate', 'Pack appropriate clothes for the weather', 4
FROM public.checklist_templates t WHERE t.title = 'Packing Your Suitcase'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Pack essential toiletries', 'Bring travel-sized personal care items', 5
FROM public.checklist_templates t WHERE t.title = 'Packing Your Suitcase'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Include comfort items', 'Pack items that will help you feel at home', 6
FROM public.checklist_templates t WHERE t.title = 'Packing Your Suitcase'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Pack important documents copies', 'Bring photocopies of passport, visa, etc.', 7
FROM public.checklist_templates t WHERE t.title = 'Packing Your Suitcase'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Emergency contact information', 'Have emergency contacts written down', 8
FROM public.checklist_templates t WHERE t.title = 'Packing Your Suitcase'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Pack entertainment for travel', 'Books, tablets, or other entertainment', 9
FROM public.checklist_templates t WHERE t.title = 'Packing Your Suitcase'
ON CONFLICT (template_id, title) DO NOTHING;

INSERT INTO public.checklist_items (id, template_id, title, description, order_index)
SELECT gen_random_uuid(), t.id, 'Include first aid kit', 'Basic medical supplies for emergencies', 10
FROM public.checklist_templates t WHERE t.title = 'Packing Your Suitcase'
ON CONFLICT (template_id, title) DO NOTHING;

COMMIT;

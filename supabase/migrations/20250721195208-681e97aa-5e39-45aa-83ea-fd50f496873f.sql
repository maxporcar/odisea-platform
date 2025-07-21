-- Create enum for checklist categories
CREATE TYPE checklist_category AS ENUM (
  'three_months_before',
  'one_two_months_before', 
  'two_weeks_before',
  'travel_day',
  'first_week_abroad',
  'packing_suitcase'
);

-- Create user trips table to track specific destinations/trips
CREATE TABLE user_trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  city_id UUID REFERENCES cities(id),
  country_id TEXT REFERENCES countries(id),
  destination_name TEXT NOT NULL,
  departure_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create checklist templates (admin-managed)
CREATE TABLE checklist_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category checklist_category NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  city_id UUID REFERENCES cities(id), -- NULL means applies to all cities
  country_id TEXT REFERENCES countries(id), -- NULL means applies to all countries
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create checklist items within templates
CREATE TABLE checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID NOT NULL REFERENCES checklist_templates(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user checklist progress
CREATE TABLE user_checklist_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trip_id UUID NOT NULL REFERENCES user_trips(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES checklist_items(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, trip_id, item_id)
);

-- Enable RLS
ALTER TABLE user_trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_checklist_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_trips
CREATE POLICY "Users can view their own trips"
ON user_trips FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own trips"
ON user_trips FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips"
ON user_trips FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trips"
ON user_trips FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for checklist_templates (public read, admin write)
CREATE POLICY "Templates are viewable by everyone"
ON checklist_templates FOR SELECT
USING (true);

CREATE POLICY "Admins can manage templates"
ON checklist_templates FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- RLS Policies for checklist_items (public read, admin write)
CREATE POLICY "Items are viewable by everyone"
ON checklist_items FOR SELECT
USING (true);

CREATE POLICY "Admins can manage items"
ON checklist_items FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- RLS Policies for user_checklist_progress
CREATE POLICY "Users can view their own progress"
ON user_checklist_progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
ON user_checklist_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
ON user_checklist_progress FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress"
ON user_checklist_progress FOR DELETE
USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_user_trips_user_id ON user_trips(user_id);
CREATE INDEX idx_checklist_templates_category ON checklist_templates(category);
CREATE INDEX idx_checklist_templates_city ON checklist_templates(city_id);
CREATE INDEX idx_checklist_items_template ON checklist_items(template_id);
CREATE INDEX idx_user_progress_user_trip ON user_checklist_progress(user_id, trip_id);

-- Add trigger for updated_at columns
CREATE TRIGGER update_user_trips_updated_at
  BEFORE UPDATE ON user_trips
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_checklist_templates_updated_at
  BEFORE UPDATE ON checklist_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_checklist_items_updated_at
  BEFORE UPDATE ON checklist_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_checklist_progress_updated_at
  BEFORE UPDATE ON user_checklist_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample checklist templates
INSERT INTO checklist_templates (category, title, description, order_index) VALUES
('three_months_before', '3 Months Before Departure', 'Essential tasks to complete 3 months before your trip', 1),
('one_two_months_before', '1-2 Months Before Departure', 'Important preparations 1-2 months before departure', 2),
('two_weeks_before', '2 Weeks Before Departure', 'Final preparations in the weeks before departure', 3),
('travel_day', 'Travel Day', 'Essential items and tasks for your travel day', 4),
('first_week_abroad', 'First Week Abroad', 'Important tasks for your first week in your new destination', 5),
('packing_suitcase', 'Packing Your Suitcase', 'Essential items to pack for your international trip', 6);

-- Insert sample checklist items
WITH template_ids AS (
  SELECT id, category FROM checklist_templates
)
INSERT INTO checklist_items (template_id, title, description, order_index)
SELECT 
  t.id,
  item.title,
  item.description,
  item.order_index
FROM template_ids t
CROSS JOIN LATERAL (
  VALUES 
    -- 3 months before
    ('Apply for passport/visa', 'Ensure your passport is valid and apply for necessary visas', 1),
    ('Research housing options', 'Look into dormitories, apartments, or homestays', 2),
    ('Apply for student visa', 'Submit your student visa application with all required documents', 3),
    ('Book flight tickets', 'Reserve your flights early for better prices', 4),
    ('Contact your university', 'Reach out to the international student office', 5)
) AS item(title, description, order_index)
WHERE t.category = 'three_months_before'

UNION ALL

SELECT 
  t.id,
  item.title,
  item.description,
  item.order_index
FROM template_ids t
CROSS JOIN LATERAL (
  VALUES 
    ('Confirm housing arrangements', 'Finalize your accommodation details', 1),
    ('Arrange health insurance', 'Get international student health coverage', 2),
    ('Open international bank account', 'Set up banking for your destination country', 3),
    ('Book medical check-up', 'Get required health clearances and vaccinations', 4),
    ('Notify bank of travel', 'Inform your bank about international travel plans', 5)
) AS item(title, description, order_index)
WHERE t.category = 'one_two_months_before'

UNION ALL

SELECT 
  t.id,
  item.title,
  item.description,
  item.order_index
FROM template_ids t
CROSS JOIN LATERAL (
  VALUES 
    ('Pack essentials', 'Pack clothes and personal items for your trip', 1),
    ('Confirm flight details', 'Check flight times and gate information', 2),
    ('Download offline maps', 'Save maps and translation apps for your destination', 3),
    ('Prepare important documents', 'Organize passport, visa, and university documents', 4),
    ('Exchange currency', 'Get local currency or arrange international cards', 5)
) AS item(title, description, order_index)
WHERE t.category = 'two_weeks_before'

UNION ALL

SELECT 
  t.id,
  item.title,
  item.description,
  item.order_index
FROM template_ids t
CROSS JOIN LATERAL (
  VALUES 
    ('Check-in online', 'Complete online check-in 24 hours before flight', 1),
    ('Arrive at airport early', 'Arrive 3 hours early for international flights', 2),
    ('Keep documents handy', 'Have passport and boarding pass easily accessible', 3),
    ('Stay hydrated', 'Drink plenty of water during travel', 4),
    ('Charge devices', 'Ensure all electronic devices are fully charged', 5)
) AS item(title, description, order_index)
WHERE t.category = 'travel_day'

UNION ALL

SELECT 
  t.id,
  item.title,
  item.description,
  item.order_index
FROM template_ids t
CROSS JOIN LATERAL (
  VALUES 
    ('Find accommodation', 'Locate and check into your housing', 1),
    ('Get local SIM card', 'Set up local phone service', 2),
    ('Register with university', 'Complete university registration process', 3),
    ('Open local bank account', 'Set up banking in your new country', 4),
    ('Explore neighborhood', 'Familiarize yourself with local area and services', 5)
) AS item(title, description, order_index)
WHERE t.category = 'first_week_abroad'

UNION ALL

SELECT 
  t.id,
  item.title,
  item.description,
  item.order_index
FROM template_ids t
CROSS JOIN LATERAL (
  VALUES 
    ('Check airline baggage rules', 'Review weight and size restrictions for your airline', 1),
    ('Pack travel adapters', 'Bring appropriate power adapters for your destination', 2),
    ('Bring medical documents', 'Pack prescription medications and health records', 3),
    ('Prepare clothing for climate', 'Pack appropriate clothes for local weather', 4),
    ('Pack essential electronics', 'Bring laptop, phone chargers, and adapters', 5),
    ('Include comfort items', 'Pack a few items from home for comfort', 6),
    ('Prepare travel documents folder', 'Organize all important papers in one place', 7),
    ('Pack emergency contact list', 'Include important phone numbers and addresses', 8)
) AS item(title, description, order_index)
WHERE t.category = 'packing_suitcase';
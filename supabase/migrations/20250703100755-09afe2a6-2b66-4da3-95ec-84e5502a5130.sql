-- Create enum for cost of living levels
CREATE TYPE public.cost_level AS ENUM ('low', 'medium', 'high');

-- Create countries table
CREATE TABLE public.countries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  capital TEXT NOT NULL,
  continent TEXT NOT NULL,
  language TEXT NOT NULL,
  currency TEXT NOT NULL,
  population TEXT NOT NULL,
  cost_of_living cost_level NOT NULL DEFAULT 'medium',
  description TEXT NOT NULL,
  capital_description TEXT NOT NULL,
  student_population TEXT,
  visa_info TEXT,
  housing TEXT,
  transportation TEXT,
  flag TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cities table
CREATE TABLE public.cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id TEXT NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create universities table
CREATE TABLE public.universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id TEXT NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  city_id UUID REFERENCES public.cities(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  website_url TEXT,
  ranking INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id TEXT REFERENCES public.countries(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  destination TEXT NOT NULL,
  duration TEXT,
  program TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  short_story TEXT,
  full_story TEXT,
  tips TEXT[],
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table for additional user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  country TEXT,
  language TEXT DEFAULT 'es',
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for countries (public read access)
CREATE POLICY "Countries are viewable by everyone" 
ON public.countries FOR SELECT 
USING (true);

-- RLS Policies for cities (public read access)
CREATE POLICY "Cities are viewable by everyone" 
ON public.cities FOR SELECT 
USING (true);

-- RLS Policies for universities (public read access)
CREATE POLICY "Universities are viewable by everyone" 
ON public.universities FOR SELECT 
USING (true);

-- RLS Policies for testimonials (public read access)
CREATE POLICY "Testimonials are viewable by everyone" 
ON public.testimonials FOR SELECT 
USING (true);

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Create function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers for timestamps
CREATE TRIGGER update_countries_updated_at
  BEFORE UPDATE ON public.countries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cities_updated_at
  BEFORE UPDATE ON public.cities
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_universities_updated_at
  BEFORE UPDATE ON public.universities
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_cities_country_id ON public.cities(country_id);
CREATE INDEX idx_universities_country_id ON public.universities(country_id);
CREATE INDEX idx_universities_city_id ON public.universities(city_id);
CREATE INDEX idx_testimonials_country_id ON public.testimonials(country_id);
CREATE INDEX idx_countries_continent ON public.countries(continent);
CREATE INDEX idx_countries_cost_of_living ON public.countries(cost_of_living);
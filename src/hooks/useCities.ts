
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type City = Database['public']['Tables']['cities']['Row'];

export const useCities = (countryId?: string) => {
  return useQuery({
    queryKey: ['cities', countryId],
    queryFn: async (): Promise<City[]> => {
      console.log(`🔍 Fetching cities for country ${countryId}...`);
      
      let query = supabase
        .from('cities')
        .select(`
          *,
          countries (
            id,
            name,
            flag,
            slug
          )
        `)
        .order('name');
      
      if (countryId) {
        query = query.eq('country_id', countryId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Error fetching cities:', error);
        throw new Error(`Error fetching cities: ${error.message}`);
      }

      console.log(`✅ Fetched ${data?.length || 0} cities`);
      return data || [];
    },
    enabled: !countryId || !!countryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useCitiesByCountrySlug = (countrySlug: string) => {
  return useQuery({
    queryKey: ['cities-by-country-slug', countrySlug],
    queryFn: async (): Promise<City[]> => {
      console.log(`🔍 Fetching cities for country slug ${countrySlug}...`);
      
      const { data, error } = await supabase
        .from('cities')
        .select(`
          *,
          countries (
            id,
            name,
            flag,
            slug
          )
        `)
        .eq('country_slug', countrySlug)
        .order('name');

      if (error) {
        console.error('❌ Error fetching cities by country slug:', error);
        throw new Error(`Error fetching cities: ${error.message}`);
      }

      console.log(`✅ Fetched ${data?.length || 0} cities for country ${countrySlug}`);
      return data || [];
    },
    enabled: !!countrySlug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useCityBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['city', slug],
    queryFn: async (): Promise<City | null> => {
      console.log(`🔍 Fetching city with slug ${slug}...`);
      
      const { data, error } = await supabase
        .from('cities')
        .select(`
          *,
          countries (
            id,
            name,
            flag,
            slug
          )
        `)
        .eq('slug', slug)
        .maybeSingle();

      if (error) {
        console.error(`❌ Error fetching city ${slug}:`, error);
        throw new Error(`Error fetching city: ${error.message}`);
      }

      console.log(`✅ Fetched city ${slug}:`, data?.name || 'Not found');
      return data;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useAllCities = () => {
  return useQuery({
    queryKey: ['cities-all'],
    queryFn: async (): Promise<City[]> => {
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)
        .order('name');

      if (error) {
        console.error('❌ Error fetching all cities:', error);
        throw new Error(`Error fetching cities: ${error.message}`);
      }

      return data || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

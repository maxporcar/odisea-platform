import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type City = Database['public']['Tables']['cities']['Row'];

export const useCities = (countryId?: string) => {
  return useQuery({
    queryKey: ['cities', countryId],
    queryFn: async (): Promise<City[]> => {
      console.log(`🔍 Fetching cities for country ${countryId}...`);
      
      let query = supabase.from('cities').select('*').order('name');
      
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

export const useCity = (id: string) => {
  return useQuery({
    queryKey: ['city', id],
    queryFn: async (): Promise<City | null> => {
      console.log(`🔍 Fetching city ${id}...`);
      
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error(`❌ Error fetching city ${id}:`, error);
        throw new Error(`Error fetching city: ${error.message}`);
      }

      console.log(`✅ Fetched city ${id}:`, data?.name || 'Not found');
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
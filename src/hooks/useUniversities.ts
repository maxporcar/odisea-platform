import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type University = Database['public']['Tables']['universities']['Row'];

export const useUniversities = (countryId?: string, cityId?: string) => {
  return useQuery({
    queryKey: ['universities', countryId, cityId],
    queryFn: async (): Promise<University[]> => {
      console.log(`🔍 Fetching universities for country ${countryId}, city ${cityId}...`);
      
      let query = supabase.from('universities').select('*').order('ranking');
      
      if (countryId) {
        query = query.eq('country_id', countryId);
      }
      
      if (cityId) {
        query = query.eq('city_id', cityId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Error fetching universities:', error);
        throw new Error(`Error fetching universities: ${error.message}`);
      }

      console.log(`✅ Fetched ${data?.length || 0} universities`);
      return data || [];
    },
    enabled: !countryId || !!countryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useUniversity = (id: string) => {
  return useQuery({
    queryKey: ['university', id],
    queryFn: async (): Promise<University | null> => {
      console.log(`🔍 Fetching university ${id}...`);
      
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error(`❌ Error fetching university ${id}:`, error);
        throw new Error(`Error fetching university: ${error.message}`);
      }

      console.log(`✅ Fetched university ${id}:`, data?.name || 'Not found');
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
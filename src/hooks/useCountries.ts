
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Country = Database['public']['Tables']['countries']['Row'];

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async (): Promise<Country[]> => {
      console.log('🔍 Fetching countries from Supabase...');
      
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .order('name');

      if (error) {
        console.error('❌ Error fetching countries:', error);
        throw new Error(`Error fetching countries: ${error.message}`);
      }

      console.log(`✅ Fetched ${data?.length || 0} countries from Supabase`);
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCountry = (id: string) => {
  return useQuery({
    queryKey: ['country', id],
    queryFn: async (): Promise<Country | null> => {
      console.log(`🔍 Fetching country ${id} from Supabase...`);
      
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error(`❌ Error fetching country ${id}:`, error);
        throw new Error(`Error fetching country: ${error.message}`);
      }

      console.log(`✅ Fetched country ${id}:`, data?.name || 'Not found');
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

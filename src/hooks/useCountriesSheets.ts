
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type CountrySheet = Database['public']['Tables']['countries_sheets']['Row'];

export const useCountrySheetBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['country-sheet-by-slug', slug],
    queryFn: async (): Promise<CountrySheet | null> => {
      console.log(`🔍 Fetching country sheet by slug ${slug} from Supabase...`);
      
      const { data, error } = await supabase
        .from('countries_sheets')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) {
        console.error(`❌ Error fetching country sheet by slug ${slug}:`, error);
        throw new Error(`Error fetching country sheet: ${error.message}`);
      }

      console.log(`✅ Fetched country sheet by slug ${slug}:`, data?.name || 'Not found');
      return data;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

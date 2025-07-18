
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CountryContent {
  id: string;
  country_id: string;
  section: 'overview' | 'culture' | 'life_activities' | 'scholarships' | 'visa' | 'medical';
  content_md: string;
  created_at: string;
  updated_at: string;
}

export const useCountryContent = (countryId: string) => {
  return useQuery({
    queryKey: ['country-content', countryId],
    queryFn: async () => {
      console.log('Fetching country content for:', countryId);
      
      const { data, error } = await supabase
        .from('country_content')
        .select('*')
        .eq('country_id', countryId)
        .order('section');

      if (error) {
        console.error('Error fetching country content:', error);
        throw error;
      }

      console.log('Country content fetched:', data);
      return data as CountryContent[];
    },
    enabled: !!countryId
  });
};

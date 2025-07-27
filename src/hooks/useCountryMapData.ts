
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useParams } from 'react-router-dom';
import type { Database } from '@/integrations/supabase/types';

type Country = Database['public']['Tables']['countries']['Row'];
type City = Database['public']['Tables']['cities']['Row'];

export function useCountryMapData() {
  const { countryId } = useParams<{ countryId: string }>();

  return useQuery({
    queryKey: ['countryMap', countryId],
    queryFn: async () => {
      console.log(`🗺️ Fetching country map data for ${countryId}...`);
      
      // 1) Fetch this country's data
      const { data: country, error: cErr } = await supabase
        .from('countries')
        .select('*')
        .eq('id', countryId)
        .maybeSingle();
      
      if (cErr) throw cErr;
      if (!country) throw new Error('Country not found');

      // 2) Fetch its cities
      const { data: cities, error: ciErr } = await supabase
        .from('cities')
        .select('*')
        .eq('country_id', country.id)
        .not('latitude', 'is', null)
        .not('longitude', 'is', null);
      
      if (ciErr) throw ciErr;

      console.log(`✅ Fetched ${cities?.length || 0} cities for ${country.name}`);
      return { country, cities: cities || [] };
    },
    enabled: !!countryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

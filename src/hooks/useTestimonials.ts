import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Testimonial = Database['public']['Tables']['testimonials']['Row'];

export const useTestimonials = (countryId?: string) => {
  return useQuery({
    queryKey: ['testimonials', countryId],
    queryFn: async (): Promise<Testimonial[]> => {
      console.log(`🔍 Fetching testimonials for country ${countryId}...`);
      
      let query = supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      
      if (countryId) {
        query = query.eq('country_id', countryId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Error fetching testimonials:', error);
        throw new Error(`Error fetching testimonials: ${error.message}`);
      }

      console.log(`✅ Fetched ${data?.length || 0} testimonials`);
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useTestimonial = (id: string) => {
  return useQuery({
    queryKey: ['testimonial', id],
    queryFn: async (): Promise<Testimonial | null> => {
      console.log(`🔍 Fetching testimonial ${id}...`);
      
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error(`❌ Error fetching testimonial ${id}:`, error);
        throw new Error(`Error fetching testimonial: ${error.message}`);
      }

      console.log(`✅ Fetched testimonial ${id}:`, data?.name || 'Not found');
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
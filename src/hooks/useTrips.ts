import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UserTrip {
  id: string;
  user_id: string;
  city_id?: string;
  country_id?: string;
  destination_name: string;
  departure_date?: string;
  created_at: string;
  updated_at: string;
}

export const useTrips = () => {
  const [trips, setTrips] = useState<UserTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTrips = async () => {
    if (!user) {
      setTrips([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_trips')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTrips(data || []);
    } catch (error) {
      console.error('Error fetching trips:', error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  const createTrip = async (tripData: Omit<UserTrip, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('user_trips')
        .insert([{ ...tripData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchTrips();
      return data;
    } catch (error) {
      console.error('Error creating trip:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [user]);

  return {
    trips,
    loading,
    fetchTrips,
    createTrip,
  };
};

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ChecklistTemplate {
  id: string;
  category: string;
  title: string;
  description?: string;
  order_index: number;
  is_active: boolean;
}

interface ChecklistItem {
  id: string;
  template_id: string;
  title: string;
  description?: string;
  order_index: number;
  is_active: boolean;
}

interface ChecklistProgress {
  id: string;
  user_id: string;
  trip_id: string;
  item_id: string;
  completed: boolean;
  completed_at?: string;
}

interface ChecklistData {
  template: ChecklistTemplate;
  items: ChecklistItem[];
  progress: ChecklistProgress[];
}

export const useChecklist = (tripId?: string) => {
  const [checklist, setChecklist] = useState<ChecklistData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchChecklist = async () => {
    if (!user || !tripId) {
      setChecklist([]);
      setLoading(false);
      return;
    }

    try {
      // Fetch templates with their items
      const { data: templates, error: templatesError } = await supabase
        .from('checklist_templates')
        .select(`
          *,
          checklist_items(*)
        `)
        .eq('is_active', true)
        .order('order_index');

      if (templatesError) throw templatesError;

      // Fetch user progress for this trip
      const { data: progress, error: progressError } = await supabase
        .from('user_checklist_progress')
        .select('*')
        .eq('trip_id', tripId);

      if (progressError) throw progressError;

      // Combine data
      const checklistData: ChecklistData[] = templates?.map(template => ({
        template: {
          id: template.id,
          category: template.category,
          title: template.title,
          description: template.description,
          order_index: template.order_index,
          is_active: template.is_active,
        },
        items: template.checklist_items
          ?.filter((item: any) => item.is_active)
          ?.sort((a: any, b: any) => a.order_index - b.order_index) || [],
        progress: progress?.filter(p => 
          template.checklist_items?.some((item: any) => item.id === p.item_id)
        ) || [],
      })) || [];

      setChecklist(checklistData);
    } catch (error) {
      console.error('Error fetching checklist:', error);
      setChecklist([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = async (itemId: string) => {
    if (!user || !tripId) return;

    try {
      // Check if progress exists
      const { data: existingProgress } = await supabase
        .from('user_checklist_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('trip_id', tripId)
        .eq('item_id', itemId)
        .single();

      if (existingProgress) {
        // Update existing progress
        await supabase
          .from('user_checklist_progress')
          .update({
            completed: !existingProgress.completed,
            completed_at: !existingProgress.completed ? new Date().toISOString() : null,
          })
          .eq('id', existingProgress.id);
      } else {
        // Create new progress entry
        await supabase
          .from('user_checklist_progress')
          .insert({
            user_id: user.id,
            trip_id: tripId,
            item_id: itemId,
            completed: true,
            completed_at: new Date().toISOString(),
          });
      }

      await fetchChecklist();
    } catch (error) {
      console.error('Error toggling checklist item:', error);
    }
  };

  useEffect(() => {
    fetchChecklist();
  }, [user, tripId]);

  return {
    checklist,
    loading,
    fetchChecklist,
    toggleItem,
  };
};

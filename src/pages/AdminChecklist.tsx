import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Pencil, Trash2, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

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

const categories = [
  { value: 'three_months_before', label: '3 Months Before' },
  { value: 'one_two_months_before', label: '1-2 Months Before' },
  { value: 'two_weeks_before', label: '2 Weeks Before' },
  { value: 'travel_day', label: 'Travel Day' },
  { value: 'first_week_abroad', label: 'First Week Abroad' },
  { value: 'packing_suitcase', label: 'Packing Suitcase' },
];

export default function AdminChecklist() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [templates, setTemplates] = useState<ChecklistTemplate[]>([]);
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  // Form states
  const [templateForm, setTemplateForm] = useState<{
    category: string;
    title: string;
    description: string;
    order_index: number;
  }>({
    category: '',
    title: '',
    description: '',
    order_index: 0,
  });
  
  const [itemForm, setItemForm] = useState({
    title: '',
    description: '',
    order_index: 0,
  });

  const [editingTemplate, setEditingTemplate] = useState<ChecklistTemplate | null>(null);
  const [editingItem, setEditingItem] = useState<ChecklistItem | null>(null);

  useEffect(() => {
    if (profile?.is_admin) {
      fetchTemplates();
    }
  }, [profile]);

  useEffect(() => {
    if (selectedTemplate) {
      fetchItems(selectedTemplate);
    }
  }, [selectedTemplate]);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('checklist_templates')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Error",
        description: "Failed to load checklist templates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async (templateId: string) => {
    try {
      const { data, error } = await supabase
        .from('checklist_items')
        .select('*')
        .eq('template_id', templateId)
        .order('order_index');

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast({
        title: "Error",
        description: "Failed to load checklist items",
        variant: "destructive",
      });
    }
  };

  const createTemplate = async () => {
    try {
      const { error } = await supabase
        .from('checklist_templates')
        .insert([templateForm as any]);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Template created successfully",
      });
      
      fetchTemplates();
      setTemplateForm({ category: '', title: '', description: '', order_index: 0 });
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: "Error",
        description: "Failed to create template",
        variant: "destructive",
      });
    }
  };

  const createItem = async () => {
    if (!selectedTemplate) return;

    try {
      const { error } = await supabase
        .from('checklist_items')
        .insert([{ ...itemForm, template_id: selectedTemplate }]);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Item created successfully",
      });
      
      fetchItems(selectedTemplate);
      setItemForm({ title: '', description: '', order_index: 0 });
    } catch (error) {
      console.error('Error creating item:', error);
      toast({
        title: "Error",
        description: "Failed to create item",
        variant: "destructive",
      });
    }
  };

  const updateTemplate = async () => {
    if (!editingTemplate) return;

    try {
      const { error } = await supabase
        .from('checklist_templates')
        .update(templateForm as any)
        .eq('id', editingTemplate.id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Template updated successfully",
      });
      
      fetchTemplates();
      setEditingTemplate(null);
      setTemplateForm({ category: '', title: '', description: '', order_index: 0 });
    } catch (error) {
      console.error('Error updating template:', error);
      toast({
        title: "Error",
        description: "Failed to update template",
        variant: "destructive",
      });
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('checklist_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Template deleted successfully",
      });
      
      fetchTemplates();
      if (selectedTemplate === id) {
        setSelectedTemplate('');
        setItems([]);
      }
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive",
      });
    }
  };

  if (!profile?.is_admin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Admin Access Required</h2>
            <p className="text-muted-foreground mb-4">
              You need admin privileges to access the checklist management interface.
            </p>
            <Button asChild>
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Checklist Administration</h1>
        <p className="text-muted-foreground">
          Manage checklist templates and items for Odisea+ subscribers
        </p>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="items">Items</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Template</CardTitle>
              <CardDescription>
                Add a new checklist category/template
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={templateForm.category}
                    onValueChange={(value) => setTemplateForm(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="order">Order Index</Label>
                  <Input
                    id="order"
                    type="number"
                    value={templateForm.order_index}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={templateForm.title}
                  onChange={(e) => setTemplateForm(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={templateForm.description}
                  onChange={(e) => setTemplateForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <Button onClick={editingTemplate ? updateTemplate : createTemplate}>
                {editingTemplate ? 'Update Template' : 'Create Template'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {templates.map(template => (
                  <div key={template.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">{template.title}</h4>
                      <p className="text-sm text-muted-foreground">{template.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        View Items
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingTemplate(template);
                          setTemplateForm({
                            category: template.category,
                            title: template.title,
                            description: template.description || '',
                            order_index: template.order_index,
                          });
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteTemplate(template.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Template</CardTitle>
              <CardDescription>
                Choose a template to manage its items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {selectedTemplate && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Add New Item</CardTitle>
                  <CardDescription>
                    Add a new checklist item to the selected template
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="itemTitle">Title</Label>
                    <Input
                      id="itemTitle"
                      value={itemForm.title}
                      onChange={(e) => setItemForm(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="itemDescription">Description</Label>
                    <Textarea
                      id="itemDescription"
                      value={itemForm.description}
                      onChange={(e) => setItemForm(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="itemOrder">Order Index</Label>
                    <Input
                      id="itemOrder"
                      type="number"
                      value={itemForm.order_index}
                      onChange={(e) => setItemForm(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <Button onClick={createItem}>
                    Add Item
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          {item.description && (
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
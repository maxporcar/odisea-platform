
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Shield, Users, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

interface User {
  id: string;
  email: string;
  full_name?: string;
  is_premium: boolean;
  is_admin: boolean;
  created_at: string;
  institution?: {
    name: string;
    domain: string;
  };
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-users');
      
      if (error) throw error;
      
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch users",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId: string, updates: Partial<User>) => {
    try {
      const { error } = await supabase.functions.invoke('admin-users', {
        body: updates
      });

      if (error) throw error;

      setUsers(users.map(u => u.id === userId ? { ...u, ...updates } : u));
      
      toast({
        title: "Success",
        description: "User updated successfully",
      });
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading users...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
          <p className="text-muted-foreground">Manage users, subscriptions, and permissions</p>
        </div>

        <Card className="rounded-2xl shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-2xl">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Users Management ({users.length} total)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Premium Status</TableHead>
                  <TableHead>Admin Role</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((userData) => (
                  <TableRow key={userData.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{userData.email}</TableCell>
                    <TableCell>{userData.full_name || 'Not set'}</TableCell>
                    <TableCell>
                      {userData.institution ? (
                        <div className="text-sm">
                          <div className="font-medium">{userData.institution.name}</div>
                          <div className="text-muted-foreground">{userData.institution.domain}</div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Individual</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={userData.is_premium}
                          onCheckedChange={(checked) =>
                            updateUser(userData.id, { is_premium: checked })
                          }
                        />
                        {userData.is_premium && <Crown className="w-4 h-4 text-warm-amber" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={userData.is_admin}
                          onCheckedChange={(checked) =>
                            updateUser(userData.id, { is_admin: checked })
                          }
                          disabled={userData.id === user?.id} // Prevent self-demotion
                        />
                        {userData.is_admin && <Shield className="w-4 h-4 text-primary" />}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(userData.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminUsers;


import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Shield, Users, Crown, RefreshCw } from 'lucide-react';
import { Navigate } from 'react-router-dom';

interface UserProfile {
  id: string;
  full_name: string | null;
  is_premium: boolean;
  is_admin: boolean;
  institution_id: string | null;
  email?: string;
  institution?: {
    name: string;
    domain: string;
  } | null;
}

const Admin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const checkAdminStatus = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      setIsAdmin(data?.is_admin || false);
    } catch (error: any) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      // Get all user profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          is_premium,
          is_admin,
          institution_id,
          institutions (
            name,
            domain
          )
        `)
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Get user emails from auth.users (this requires admin privileges)
      const userIds = profiles?.map(p => p.id) || [];
      const usersWithEmails: UserProfile[] = [];

      for (const profile of profiles || []) {
        // For admin users, we can try to get the email, but it might not be accessible
        usersWithEmails.push({
          ...profile,
          email: 'Hidden for privacy', // We can't access auth.users emails directly
          institution: profile.institutions as any
        });
      }

      setUsers(usersWithEmails);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: error.message || 'Failed to fetch users'
      });
    }
  };

  const updateUserPremium = async (userId: string, isPremium: boolean) => {
    setUpdating(userId);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_premium: isPremium })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_premium: isPremium } : user
      ));

      toast({
        title: t('admin.success'),
        description: `User premium status ${isPremium ? 'enabled' : 'disabled'}`
      });
    } catch (error: any) {
      console.error('Error updating user premium:', error);
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: error.message || 'Failed to update user'
      });
    } finally {
      setUpdating(null);
    }
  };

  const updateUserAdmin = async (userId: string, isAdminUser: boolean) => {
    setUpdating(userId);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: isAdminUser })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_admin: isAdminUser } : user
      ));

      toast({
        title: t('admin.success'),
        description: `User admin status ${isAdminUser ? 'enabled' : 'disabled'}`
      });
    } catch (error: any) {
      console.error('Error updating user admin:', error);
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: error.message || 'Failed to update user'
      });
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-[#007A5E]" />
            <p className="text-gray-600">{t('common.loading')}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-[#007A5E]/10 rounded-2xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#007A5E]" />
              </div>
              <h1 className="text-3xl font-bold text-black">{t('admin.title')}</h1>
            </div>
            <p className="text-gray-600">{t('admin.description')}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
                <Crown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {users.filter(user => user.is_premium).length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {users.filter(user => user.is_admin).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t('admin.userManagement')}</CardTitle>
                <CardDescription>
                  {t('admin.userManagementDescription')}
                </CardDescription>
              </div>
              <Button onClick={fetchUsers} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                {t('common.refresh')}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('admin.table.name')}</TableHead>
                      <TableHead>{t('admin.table.email')}</TableHead>
                      <TableHead>{t('admin.table.institution')}</TableHead>
                      <TableHead>{t('admin.table.premium')}</TableHead>
                      <TableHead>{t('admin.table.admin')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((userProfile) => (
                      <TableRow key={userProfile.id}>
                        <TableCell className="font-medium">
                          {userProfile.full_name || 'No name'}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {userProfile.email}
                        </TableCell>
                        <TableCell>
                          {userProfile.institution ? (
                            <Badge variant="outline">
                              {userProfile.institution.name}
                            </Badge>
                          ) : (
                            <span className="text-gray-400">None</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={userProfile.is_premium}
                              onCheckedChange={(checked) => 
                                updateUserPremium(userProfile.id, checked)
                              }
                              disabled={updating === userProfile.id}
                            />
                            {userProfile.is_premium && (
                              <Crown className="w-4 h-4 text-[#FFA500]" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={userProfile.is_admin}
                              onCheckedChange={(checked) => 
                                updateUserAdmin(userProfile.id, checked)
                              }
                              disabled={updating === userProfile.id || userProfile.id === user.id}
                            />
                            {userProfile.is_admin && (
                              <Shield className="w-4 h-4 text-[#007A5E]" />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;

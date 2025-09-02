import { BaseService } from './base.service';
import { supabase, Tables, InsertTables, UpdateTables } from '../lib/supabase';

export type User = Tables<'users'>;

export class UserService extends BaseService<User> {
  constructor() {
    super('users');
  }

  async getAll(filters?: Record<string, any>): Promise<User[]> {
    let query = supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createUser(userData: {
    email: string;
    password: string;
    name: string;
    role?: 'super_admin' | 'admin' | 'editor' | 'viewer' | 'user';
  }): Promise<User> {
    try {
      // Create user using regular signup (no admin privileges needed)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name
          }
        }
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('Failed to create user');
      }

      // Create user profile in public.users table
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: userData.email,
          name: userData.name,
          role: userData.role || 'user',
          is_active: true
        })
        .select()
        .single();

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // If profile creation fails, still return the auth user data
        return {
          id: authData.user.id,
          email: userData.email,
          name: userData.name,
          role: userData.role || 'user',
          is_active: true,
          created_at: authData.user.created_at,
          updated_at: new Date().toISOString(),
          avatar_url: null
        };
      }

      await this.logAction('create', profileData.id, userData);
      return profileData;
    } catch (error: any) {
      console.error('Create user error:', error);
      throw new Error(error.message || 'Failed to create user');
    }
  }

  async updateUser(id: string, updates: UpdateTables<'users'>): Promise<User> {
    // Check permission
    const hasPermission = await this.checkPermission(['super_admin', 'admin']);
    if (!hasPermission) {
      throw new Error('Insufficient permissions to update user');
    }

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    await this.logAction('update', id, updates);
    return data;
  }

  async deleteUser(id: string): Promise<void> {
    // Check permission
    const hasPermission = await this.checkPermission(['super_admin']);
    if (!hasPermission) {
      throw new Error('Insufficient permissions to delete user');
    }

    // Delete auth user
    const { error: authError } = await supabase.auth.admin.deleteUser(id);
    if (authError) throw authError;

    await this.logAction('delete', id);
  }

  async deactivateUser(id: string): Promise<User> {
    return this.updateUser(id, { is_active: false });
  }

  async activateUser(id: string): Promise<User> {
    return this.updateUser(id, { is_active: true });
  }

  async changeUserRole(id: string, role: 'super_admin' | 'admin' | 'editor' | 'viewer' | 'user'): Promise<User> {
    // Only super_admin can change roles
    const hasPermission = await this.checkPermission(['super_admin']);
    if (!hasPermission) {
      throw new Error('Only super admins can change user roles');
    }

    return this.updateUser(id, { role });
  }

  async getAdmins(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .in('role', ['super_admin', 'admin', 'editor'])
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getRegularUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'user')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async searchUsers(query: string): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getUserStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    admins: number;
    users: number;
    newThisMonth: number;
  }> {
    const { data, error } = await supabase
      .from('users')
      .select('is_active, role, created_at');

    if (error) throw error;

    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const stats = {
      total: data?.length || 0,
      active: data?.filter(u => u.is_active).length || 0,
      inactive: data?.filter(u => !u.is_active).length || 0,
      admins: data?.filter(u => ['super_admin', 'admin', 'editor'].includes(u.role)).length || 0,
      users: data?.filter(u => u.role === 'user').length || 0,
      newThisMonth: data?.filter(u => new Date(u.created_at) >= thisMonth).length || 0
    };

    return stats;
  }

  async getCurrentUserProfile(): Promise<User | null> {
    const user = await this.getCurrentUser();
    if (!user) return null;

    return this.getById(user.id);
  }

  async updateCurrentUserProfile(updates: Partial<Pick<User, 'name' | 'avatar_url'>>): Promise<User> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;
  }

  async resetUserPassword(userId: string, newPassword: string): Promise<void> {
    // Check permission
    const hasPermission = await this.checkPermission(['super_admin', 'admin']);
    if (!hasPermission) {
      throw new Error('Insufficient permissions to reset password');
    }

    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password: newPassword
    });

    if (error) throw error;
    await this.logAction('password_reset', userId);
  }

  async getActivityLogs(userId?: string, limit: number = 50): Promise<any[]> {
    let query = supabase
      .from('admin_logs')
      .select(`
        *,
        user:users!admin_logs_user_id_fkey(name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }
}

export const userService = new UserService();

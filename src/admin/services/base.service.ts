import { supabaseClient as supabase } from '../lib/supabase';

export abstract class BaseService<T = any> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async getAll(filters?: Record<string, any>, orderBy?: { column: string; ascending?: boolean }): Promise<T[]> {
    let query = supabase.from(this.tableName).select('*');

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
    }

    if (orderBy) {
      query = query.order(orderBy.column, { ascending: orderBy.ascending ?? false });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async getById(id: string): Promise<T | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async create(item: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T> {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(item)
      .select()
      .single();

    if (error) throw error;
    await this.logAction('create', data.id, item);
    return data;
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    await this.logAction('update', id, updates);
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;
    await this.logAction('delete', id);
  }

  async search(query: string, columns: string[]): Promise<T[]> {
    let supabaseQuery = supabase.from(this.tableName).select('*');

    // Create OR condition for searching across multiple columns
    const searchConditions = columns.map(col => `${col}.ilike.%${query}%`).join(',');
    supabaseQuery = supabaseQuery.or(searchConditions);

    const { data, error } = await supabaseQuery;
    if (error) throw error;
    return data || [];
  }

  async count(filters?: Record<string, any>): Promise<number> {
    let query = supabase.from(this.tableName).select('*', { count: 'exact', head: true });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
    }

    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async paginate(
    page: number = 1,
    limit: number = 10,
    filters?: Record<string, any>,
    orderBy?: { column: string; ascending?: boolean }
  ): Promise<{ data: T[]; total: number; page: number; limit: number; totalPages: number }> {
    const offset = (page - 1) * limit;
    
    let query = supabase.from(this.tableName).select('*');

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
    }

    if (orderBy) {
      query = query.order(orderBy.column, { ascending: orderBy.ascending ?? false });
    }

    query = query.range(offset, offset + limit - 1);

    const [{ data, error }, total] = await Promise.all([
      query,
      this.count(filters)
    ]);

    if (error) throw error;

    return {
      data: data || [],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  protected async logAction(action: string, resourceId?: string, details?: any): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('admin_logs').insert({
        user_id: user.id,
        action,
        resource_type: this.tableName,
        resource_id: resourceId,
        details
      });
    } catch (error) {
      console.error('Failed to log action:', error);
    }
  }

  protected async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  protected async checkPermission(requiredRole: string[]): Promise<boolean> {
    const user = await this.getCurrentUser();
    if (!user) return false;

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    return userData && requiredRole.includes(userData.role);
  }
}

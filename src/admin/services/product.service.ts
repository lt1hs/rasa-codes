import { BaseService } from './base.service';
import { supabase, Tables, InsertTables, UpdateTables } from '../lib/supabase';

export type Product = Tables<'products'> & {
  creator?: {
    name: string;
    avatar_url: string | null;
  };
};

export class ProductService extends BaseService<Product> {
  constructor() {
    super('products');
  }

  async getAll(filters?: Record<string, any>): Promise<Product[]> {
    let query = supabase
      .from('products')
      .select(`
        *,
        creator:users!products_created_by_fkey(name, avatar_url)
      `)
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

  async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        creator:users!products_created_by_fkey(name, avatar_url)
      `)
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        creator:users!products_created_by_fkey(name, avatar_url)
      `)
      .eq('slug', slug)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async create(product: InsertTables<'products'>): Promise<Product> {
    const user = await this.getCurrentUser();
    const productData = {
      ...product,
      created_by: user?.id,
      slug: product.slug || this.generateSlug(product.name),
      sku: product.sku || this.generateSKU()
    };

    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select(`
        *,
        creator:users!products_created_by_fkey(name, avatar_url)
      `)
      .single();

    if (error) throw error;
    await this.logAction('create', data.id, productData);
    return data;
  }

  async update(id: string, updates: UpdateTables<'products'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        creator:users!products_created_by_fkey(name, avatar_url)
      `)
      .single();

    if (error) throw error;
    await this.logAction('update', id, updates);
    return data;
  }

  async getActive(limit?: number): Promise<Product[]> {
    let query = supabase
      .from('products')
      .select(`
        *,
        creator:users!products_created_by_fkey(name, avatar_url)
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async getFeatured(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        creator:users!products_created_by_fkey(name, avatar_url)
      `)
      .eq('is_featured', true)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        creator:users!products_created_by_fkey(name, avatar_url)
      `)
      .eq('category', category)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        creator:users!products_created_by_fkey(name, avatar_url)
      `)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,short_description.ilike.%${query}%`)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.getById(id);
    if (!product) throw new Error('Product not found');

    const newQuantity = product.stock_quantity + quantity;
    const status = newQuantity <= 0 ? 'out_of_stock' : 'active';

    return this.update(id, {
      stock_quantity: newQuantity,
      status: status as any
    });
  }

  async setFeatured(id: string, featured: boolean): Promise<Product> {
    return this.update(id, { is_featured: featured });
  }

  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .not('category', 'is', null)
      .eq('status', 'active');

    if (error) throw error;
    
    const categories = [...new Set(data?.map(item => item.category).filter(Boolean))];
    return categories as string[];
  }

  async getTags(): Promise<string[]> {
    const { data, error } = await supabase
      .from('products')
      .select('tags')
      .not('tags', 'is', null)
      .eq('status', 'active');

    if (error) throw error;
    
    const allTags = data?.flatMap(item => item.tags || []) || [];
    return [...new Set(allTags)];
  }

  async getInventoryReport(): Promise<{
    total: number;
    active: number;
    outOfStock: number;
    lowStock: number;
    totalValue: number;
  }> {
    const { data, error } = await supabase
      .from('products')
      .select('status, stock_quantity, price');

    if (error) throw error;

    const stats = {
      total: data?.length || 0,
      active: data?.filter(p => p.status === 'active').length || 0,
      outOfStock: data?.filter(p => p.status === 'out_of_stock').length || 0,
      lowStock: data?.filter(p => p.stock_quantity <= 5 && p.stock_quantity > 0).length || 0,
      totalValue: data?.reduce((sum, p) => sum + (p.price || 0) * p.stock_quantity, 0) || 0
    };

    return stats;
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private generateSKU(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `RSA-${timestamp}-${random}`.toUpperCase();
  }
}

export const productService = new ProductService();

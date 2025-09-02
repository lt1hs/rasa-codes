import { BaseService } from './base.service';
import { supabaseClient as supabase, Tables, InsertTables, UpdateTables } from '../lib/supabase';

export type Blog = Tables<'blogs'> & {
  author?: {
    name: string;
    avatar_url: string | null;
  };
};

export class BlogService extends BaseService<Blog> {
  constructor() {
    super('blogs');
  }

  async getAll(filters?: Record<string, any>): Promise<Blog[]> {
    let query = supabase
      .from('blogs')
      .select(`
        *,
        author:users!blogs_author_id_fkey(name, avatar_url)
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

  async getById(id: string): Promise<Blog | null> {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        author:users!blogs_author_id_fkey(name, avatar_url)
      `)
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getBySlug(slug: string): Promise<Blog | null> {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        author:users!blogs_author_id_fkey(name, avatar_url)
      `)
      .eq('slug', slug)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async create(blog: InsertTables<'blogs'>): Promise<Blog> {
    const user = await this.getCurrentUser();
    const blogData = {
      ...blog,
      author_id: user?.id,
      slug: blog.slug || this.generateSlug(blog.title)
    };

    const { data, error } = await supabase
      .from('blogs')
      .insert(blogData)
      .select(`
        *,
        author:users!blogs_author_id_fkey(name, avatar_url)
      `)
      .single();

    if (error) throw error;
    await this.logAction('create', data.id, blogData);
    return data;
  }

  async update(id: string, updates: UpdateTables<'blogs'>): Promise<Blog> {
    const { data, error } = await supabase
      .from('blogs')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        author:users!blogs_author_id_fkey(name, avatar_url)
      `)
      .single();

    if (error) throw error;
    await this.logAction('update', id, updates);
    return data;
  }

  async publish(id: string): Promise<Blog> {
    return this.update(id, {
      status: 'published',
      published_at: new Date().toISOString()
    });
  }

  async unpublish(id: string): Promise<Blog> {
    return this.update(id, {
      status: 'draft',
      published_at: null
    });
  }

  async incrementViewCount(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_blog_views', { blog_id: id });
    if (error) throw error;
  }

  async getPublished(limit?: number): Promise<Blog[]> {
    let query = supabase
      .from('blogs')
      .select(`
        *,
        author:users!blogs_author_id_fkey(name, avatar_url)
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async getByCategory(category: string): Promise<Blog[]> {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        author:users!blogs_author_id_fkey(name, avatar_url)
      `)
      .eq('category', category)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async searchBlogs(query: string): Promise<Blog[]> {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        author:users!blogs_author_id_fkey(name, avatar_url)
      `)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('blogs')
      .select('category')
      .not('category', 'is', null)
      .eq('status', 'published');

    if (error) throw error;
    
    const categories = [...new Set(data?.map(item => item.category).filter(Boolean))];
    return categories as string[];
  }

  async getTags(): Promise<string[]> {
    const { data, error } = await supabase
      .from('blogs')
      .select('tags')
      .not('tags', 'is', null)
      .eq('status', 'published');

    if (error) throw error;
    
    const allTags = data?.flatMap(item => item.tags || []) || [];
    return [...new Set(allTags)];
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
}

export const blogService = new BlogService();

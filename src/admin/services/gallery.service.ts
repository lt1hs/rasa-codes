import { BaseService } from './base.service';
import { supabase, Tables, InsertTables, UpdateTables } from '../lib/supabase';

export type GalleryItem = Tables<'gallery'> & {
  uploader?: {
    name: string;
    avatar_url: string | null;
  };
};

export class GalleryService extends BaseService<GalleryItem> {
  constructor() {
    super('gallery');
  }

  async getAll(filters?: Record<string, any>): Promise<GalleryItem[]> {
    let query = supabase
      .from('gallery')
      .select(`
        *,
        uploader:users!gallery_uploaded_by_fkey(name, avatar_url)
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

  async getById(id: string): Promise<GalleryItem | null> {
    const { data, error } = await supabase
      .from('gallery')
      .select(`
        *,
        uploader:users!gallery_uploaded_by_fkey(name, avatar_url)
      `)
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async create(item: InsertTables<'gallery'>): Promise<GalleryItem> {
    const user = await this.getCurrentUser();
    const itemData = {
      ...item,
      uploaded_by: user?.id
    };

    const { data, error } = await supabase
      .from('gallery')
      .insert(itemData)
      .select(`
        *,
        uploader:users!gallery_uploaded_by_fkey(name, avatar_url)
      `)
      .single();

    if (error) throw error;
    await this.logAction('create', data.id, itemData);
    return data;
  }

  async update(id: string, updates: UpdateTables<'gallery'>): Promise<GalleryItem> {
    const { data, error } = await supabase
      .from('gallery')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        uploader:users!gallery_uploaded_by_fkey(name, avatar_url)
      `)
      .single();

    if (error) throw error;
    await this.logAction('update', id, updates);
    return data;
  }

  async uploadImage(file: File, metadata: Partial<InsertTables<'gallery'>>): Promise<GalleryItem> {
    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    // Create thumbnail (simplified - in production, use image processing service)
    const thumbnailPath = `gallery/thumbs/${fileName}`;
    const { data: { publicUrl: thumbnailUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(thumbnailPath);

    // Create gallery item
    return this.create({
      ...metadata,
      image_url: publicUrl,
      thumbnail_url: thumbnailUrl,
      title: metadata.title || file.name
    });
  }

  async getFeatured(): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from('gallery')
      .select(`
        *,
        uploader:users!gallery_uploaded_by_fkey(name, avatar_url)
      `)
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getByCategory(category: string): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from('gallery')
      .select(`
        *,
        uploader:users!gallery_uploaded_by_fkey(name, avatar_url)
      `)
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async searchImages(query: string): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from('gallery')
      .select(`
        *,
        uploader:users!gallery_uploaded_by_fkey(name, avatar_url)
      `)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,alt_text.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('gallery')
      .select('category')
      .not('category', 'is', null);

    if (error) throw error;
    
    const categories = [...new Set(data?.map(item => item.category).filter(Boolean))];
    return categories as string[];
  }

  async getTags(): Promise<string[]> {
    const { data, error } = await supabase
      .from('gallery')
      .select('tags')
      .not('tags', 'is', null);

    if (error) throw error;
    
    const allTags = data?.flatMap(item => item.tags || []) || [];
    return [...new Set(allTags)];
  }

  async setFeatured(id: string, featured: boolean): Promise<GalleryItem> {
    return this.update(id, { is_featured: featured });
  }

  async deleteImage(id: string): Promise<void> {
    // Get image info first
    const item = await this.getById(id);
    if (!item) throw new Error('Image not found');

    // Delete from storage
    if (item.image_url) {
      const path = this.extractPathFromUrl(item.image_url);
      await supabase.storage.from('images').remove([path]);
    }

    if (item.thumbnail_url) {
      const thumbPath = this.extractPathFromUrl(item.thumbnail_url);
      await supabase.storage.from('images').remove([thumbPath]);
    }

    // Delete from database
    await this.delete(id);
  }

  private extractPathFromUrl(url: string): string {
    const urlParts = url.split('/');
    const bucketIndex = urlParts.findIndex(part => part === 'images');
    return urlParts.slice(bucketIndex + 1).join('/');
  }
}

export const galleryService = new GalleryService();

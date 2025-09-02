import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not configured. Admin will use mock mode.');
}

// Create client - always create a client, even if credentials are missing
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : null;

// Export for backward compatibility
export const supabaseClient = supabase;

// Default export
export default supabase;

// Database types (same as before)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar_url: string | null;
          role: 'super_admin' | 'admin' | 'editor' | 'viewer' | 'user';
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          avatar_url?: string | null;
          role?: 'super_admin' | 'admin' | 'editor' | 'viewer' | 'user';
          is_active?: boolean;
        };
        Update: {
          email?: string;
          name?: string;
          avatar_url?: string | null;
          role?: 'super_admin' | 'admin' | 'editor' | 'viewer' | 'user';
          is_active?: boolean;
        };
      };
      blogs: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          featured_image: string | null;
          author_id: string | null;
          category: string | null;
          tags: string[] | null;
          status: 'draft' | 'published' | 'archived';
          published_at: string | null;
          created_at: string;
          updated_at: string;
          view_count: number;
          read_time: number;
        };
        Insert: {
          title: string;
          slug: string;
          content: string;
          excerpt?: string | null;
          featured_image?: string | null;
          author_id?: string | null;
          category?: string | null;
          tags?: string[] | null;
          status?: 'draft' | 'published' | 'archived';
          published_at?: string | null;
          read_time?: number;
        };
        Update: {
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          featured_image?: string | null;
          category?: string | null;
          tags?: string[] | null;
          status?: 'draft' | 'published' | 'archived';
          published_at?: string | null;
          read_time?: number;
        };
      };
      gallery: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          image_url: string;
          thumbnail_url: string | null;
          category: string | null;
          tags: string[] | null;
          alt_text: string | null;
          is_featured: boolean;
          uploaded_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          image_url: string;
          description?: string | null;
          thumbnail_url?: string | null;
          category?: string | null;
          tags?: string[] | null;
          alt_text?: string | null;
          is_featured?: boolean;
          uploaded_by?: string | null;
        };
        Update: {
          title?: string;
          description?: string | null;
          image_url?: string;
          thumbnail_url?: string | null;
          category?: string | null;
          tags?: string[] | null;
          alt_text?: string | null;
          is_featured?: boolean;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          short_description: string | null;
          price: number | null;
          sale_price: number | null;
          sku: string | null;
          stock_quantity: number;
          featured_image: string | null;
          gallery_images: string[] | null;
          category: string | null;
          tags: string[] | null;
          status: 'active' | 'inactive' | 'out_of_stock';
          is_featured: boolean;
          specifications: any | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          slug: string;
          description?: string | null;
          short_description?: string | null;
          price?: number | null;
          sale_price?: number | null;
          sku?: string | null;
          stock_quantity?: number;
          featured_image?: string | null;
          gallery_images?: string[] | null;
          category?: string | null;
          tags?: string[] | null;
          status?: 'active' | 'inactive' | 'out_of_stock';
          is_featured?: boolean;
          specifications?: any | null;
          created_by?: string | null;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          short_description?: string | null;
          price?: number | null;
          sale_price?: number | null;
          sku?: string | null;
          stock_quantity?: number;
          featured_image?: string | null;
          gallery_images?: string[] | null;
          category?: string | null;
          tags?: string[] | null;
          status?: 'active' | 'inactive' | 'out_of_stock';
          is_featured?: boolean;
          specifications?: any | null;
        };
      };
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

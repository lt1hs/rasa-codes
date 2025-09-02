# Supabase Integration Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

## 2. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 3. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `src/admin/database/schema.sql`

## 4. Storage Setup

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `images`
3. Set the bucket to public
4. Configure RLS policies for the bucket:

```sql
-- Allow public read access
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Allow users to update their own uploads
CREATE POLICY "Users can update own uploads" ON storage.objects
FOR UPDATE USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete own uploads" ON storage.objects
FOR DELETE USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## 5. Authentication Setup

1. Go to Authentication > Settings
2. Configure your site URL (e.g., `http://localhost:5173`)
3. Enable email authentication
4. Optionally configure social providers

## 6. Row Level Security (RLS)

The schema includes RLS policies that:
- Allow public read access to published content
- Restrict write access to authenticated users with appropriate roles
- Protect user data and admin functions

## 7. Install Dependencies

```bash
npm install @supabase/supabase-js
```

## 8. Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/admin/login` and create an admin account
3. Test CRUD operations in each module

## 9. Production Deployment

1. Update environment variables in your hosting platform
2. Ensure your production URL is added to Supabase auth settings
3. Configure proper CORS settings if needed

## Features Included

### ✅ Blogs Module
- Full CRUD operations
- Draft/Published status
- Author tracking
- Categories and tags
- Search functionality
- View count tracking

### ✅ Gallery Module
- Image upload to Supabase Storage
- Thumbnail generation
- Categories and tags
- Featured images
- Search functionality

### ✅ Products Module
- Complete product management
- Inventory tracking
- Categories and specifications
- Featured products
- Stock management
- SKU generation

### ✅ Users Module
- User role management
- Admin user creation
- Profile management
- Activity logging
- Permission-based access

### ✅ Admin Features
- Comprehensive dashboard
- Activity logging
- Permission system
- Secure authentication
- Real-time updates

## Security Features

- Row Level Security (RLS) enabled
- Role-based access control
- Secure file uploads
- Activity logging
- Input validation
- SQL injection protection

## Performance Optimizations

- Efficient database queries
- Proper indexing
- Pagination support
- Image optimization
- Caching strategies
- Lazy loading

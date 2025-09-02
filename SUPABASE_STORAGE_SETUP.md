# Supabase Storage Setup for Media Upload

## 1. Create Storage Bucket

In your Supabase dashboard:

1. Go to **Storage** section
2. Click **Create Bucket**
3. Name: `media`
4. Set as **Public bucket** (for easy access to uploaded images)
5. Click **Create bucket**

## 2. Set Storage Policies

Go to **Storage > Policies** and create these policies:

### Allow Public Read Access
```sql
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'media');
```

### Allow Public Upload (for anonymous users)
```sql
CREATE POLICY "Public upload access" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'media');
```

### Allow Public Update/Delete
```sql
CREATE POLICY "Public update access" ON storage.objects
FOR UPDATE USING (bucket_id = 'media');

CREATE POLICY "Public delete access" ON storage.objects
FOR DELETE USING (bucket_id = 'media');
```

## Alternative: Disable RLS for Storage (Simpler)

If you want to allow all operations without authentication:

1. Go to **Storage > Settings**
2. Find the `objects` table
3. Click **Disable RLS** for the `storage.objects` table

## 3. Environment Variables

Make sure these are set in your Netlify environment variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 4. Quick Fix SQL Commands

Run these in your Supabase SQL Editor:

```sql
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;

-- Create public access policies
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Public upload access" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'media');

CREATE POLICY "Public update access" ON storage.objects
FOR UPDATE USING (bucket_id = 'media');

CREATE POLICY "Public delete access" ON storage.objects
FOR DELETE USING (bucket_id = 'media');
```

## 5. How It Works

- **With Supabase configured**: Files upload to Supabase Storage, real URLs stored in database
- **Without Supabase**: Falls back to mock images from Picsum
- **Storage path**: Files stored as `media/timestamp-randomid.extension`
- **Public URLs**: Automatically generated for uploaded files
- **No authentication required**: Anonymous users can upload files

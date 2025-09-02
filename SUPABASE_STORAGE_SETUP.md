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

### Allow Authenticated Upload
```sql
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
```

### Allow Authenticated Update/Delete
```sql
CREATE POLICY "Authenticated users can update" ON storage.objects
FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete" ON storage.objects
FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
```

## 3. Environment Variables

Make sure these are set in your Netlify environment variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 4. How It Works

- **With Supabase configured**: Files upload to Supabase Storage, real URLs stored in database
- **Without Supabase**: Falls back to mock images from Picsum
- **Storage path**: Files stored as `media/timestamp-randomid.extension`
- **Public URLs**: Automatically generated for uploaded files

## 5. File Upload Flow

1. User selects files
2. Generate unique filename with timestamp
3. Upload to Supabase Storage bucket 'media'
4. Get public URL from Supabase
5. Store URL in gallery database table
6. Display uploaded image in media library

## 6. Benefits

- ✅ **Real file storage** - Actual user files stored securely
- ✅ **CDN delivery** - Fast image loading via Supabase CDN
- ✅ **Automatic scaling** - Supabase handles storage scaling
- ✅ **Backup included** - Files backed up by Supabase
- ✅ **Access control** - Policies control who can upload/delete

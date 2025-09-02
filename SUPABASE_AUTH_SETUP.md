# Supabase Authentication Setup

## 1. Enable Authentication in Supabase

In your Supabase dashboard:

1. Go to **Authentication** section
2. **Settings** → **General**
3. Make sure **Enable email confirmations** is OFF (for easier testing)
4. Set **Site URL** to your domain: `https://rasa-technology.com`

## 2. Create Admin User

### Option A: Via Supabase Dashboard
1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Enter email and password
4. Click **Create user**

### Option B: Via SQL (Recommended)
Go to **SQL Editor** and run:

```sql
-- Create admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@rasatech.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Admin User"}',
  false,
  '',
  '',
  '',
  ''
);
```

## 3. Environment Variables

Make sure these are set in your Netlify environment variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 4. Test Login Credentials

After setup, you can login with:
- **Email**: `admin@rasatech.com`
- **Password**: `admin123`

Or create your own user via the Supabase dashboard.

## 5. How It Works

### With Supabase Configured:
- ✅ **Real authentication** - Uses Supabase Auth
- ✅ **Secure sessions** - JWT tokens from Supabase
- ✅ **Password validation** - Real password checking
- ✅ **User management** - Managed via Supabase dashboard

### Without Supabase (Fallback):
- ✅ **Mock authentication** - Any email/password works
- ✅ **Local storage** - Session stored locally
- ✅ **Development mode** - Good for testing

## 6. Benefits of Real Auth

- ✅ **Security** - Real password hashing and validation
- ✅ **Session management** - Automatic token refresh
- ✅ **User profiles** - Rich user metadata
- ✅ **Password reset** - Built-in password recovery
- ✅ **Multi-factor auth** - Can be enabled later
- ✅ **Audit logs** - Login/logout tracking

## 7. User Management

### Add New Admin Users:
1. Go to Supabase **Authentication** → **Users**
2. Click **Add user**
3. Enter email and password
4. User can immediately login to admin panel

### Reset Password:
1. Find user in **Authentication** → **Users**
2. Click on user
3. Click **Reset password**
4. User will receive reset email

## 8. Security Settings

### Recommended Settings:
- ✅ **Enable RLS** on all tables
- ✅ **Disable sign-ups** (admin-only system)
- ✅ **Set strong password policy**
- ✅ **Enable session timeout**

### Disable Public Sign-ups:
Go to **Authentication** → **Settings** → **General**
- Turn OFF **Enable sign-ups**
- This prevents random users from creating accounts

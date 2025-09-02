-- Create admin user in Supabase
-- Run this in your Supabase SQL Editor

-- Insert admin user into auth.users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@rasacodes.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin User"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Get the user ID and update the users table
DO $$
DECLARE
    user_id UUID;
BEGIN
    SELECT id INTO user_id FROM auth.users WHERE email = 'admin@rasacodes.com';
    
    -- Insert or update in public.users table
    INSERT INTO public.users (id, email, name, role, is_active)
    VALUES (user_id, 'admin@rasacodes.com', 'Admin User', 'super_admin', true)
    ON CONFLICT (id) DO UPDATE SET
        role = 'super_admin',
        is_active = true;
END $$;

-- Simple admin user creation without foreign key issues
-- Run this in Supabase SQL Editor

-- Just create the admin user directly
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid,
  'authenticated',
  'authenticated',
  'admin@rasacodes.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Admin User"}',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Create the profile
INSERT INTO public.users (id, email, name, role, is_active)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid,
  'admin@rasacodes.com',
  'Admin User',
  'super_admin',
  true
) ON CONFLICT (id) DO UPDATE SET
  role = 'super_admin',
  is_active = true;

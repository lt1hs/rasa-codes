-- Create admin user properly in Supabase
-- Run this in Supabase SQL Editor

-- First, delete any existing user with this email
DELETE FROM auth.users WHERE email = 'admin@rasacodes.com';
DELETE FROM public.users WHERE email = 'admin@rasacodes.com';

-- Create the admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_sent_at,
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
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Admin User"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Get the created user ID and create profile
DO $$
DECLARE
    user_uuid UUID;
BEGIN
    -- Get the user ID
    SELECT id INTO user_uuid FROM auth.users WHERE email = 'admin@rasacodes.com';
    
    -- Create user profile
    INSERT INTO public.users (id, email, name, role, is_active)
    VALUES (user_uuid, 'admin@rasacodes.com', 'Admin User', 'super_admin', true);
    
    RAISE NOTICE 'Admin user created with ID: %', user_uuid;
END $$;

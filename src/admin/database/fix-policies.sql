-- Drop existing policies that cause infinite recursion
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can manage users" ON public.users;
DROP POLICY IF EXISTS "Anyone can view published blogs" ON public.blogs;
DROP POLICY IF EXISTS "Editors can manage blogs" ON public.blogs;
DROP POLICY IF EXISTS "Anyone can view gallery" ON public.gallery;
DROP POLICY IF EXISTS "Editors can manage gallery" ON public.gallery;
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
DROP POLICY IF EXISTS "Editors can manage products" ON public.products;
DROP POLICY IF EXISTS "Admins can view logs" ON public.admin_logs;
DROP POLICY IF EXISTS "System can insert logs" ON public.admin_logs;

-- Create simplified policies without recursion
-- Users table - allow all operations for now (can be restricted later)
CREATE POLICY "Allow all users operations" ON public.users FOR ALL USING (true);

-- Blogs table - allow all operations for authenticated users
CREATE POLICY "Allow authenticated blog operations" ON public.blogs FOR ALL USING (auth.role() = 'authenticated');

-- Gallery table - allow all operations
CREATE POLICY "Allow all gallery operations" ON public.gallery FOR ALL USING (true);

-- Products table - allow all operations for authenticated users
CREATE POLICY "Allow authenticated product operations" ON public.products FOR ALL USING (auth.role() = 'authenticated');

-- Admin logs - allow all operations
CREATE POLICY "Allow all admin log operations" ON public.admin_logs FOR ALL USING (true);

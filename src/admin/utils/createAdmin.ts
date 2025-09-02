import { supabase } from '../lib/supabase';

export async function createAdminUser(email: string, password: string, name: string) {
  try {
    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });

    if (authError) throw authError;

    if (authData.user) {
      // Update user role to admin
      const { error: updateError } = await supabase
        .from('users')
        .update({ role: 'super_admin' })
        .eq('id', authData.user.id);

      if (updateError) throw updateError;

      console.log('✅ Admin user created successfully');
      return authData.user;
    }
  } catch (error) {
    console.error('❌ Failed to create admin user:', error);
    throw error;
  }
}

// Usage example:
// createAdminUser('admin@rasatech.com', 'admin123', 'Admin User');

import { supabase } from '../lib/supabase';

export async function testSupabaseConnection() {
  try {
    // Test basic connection
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    
    console.log('✅ Supabase connected successfully');
    console.log('Users table accessible, count:', data);
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return false;
  }
}

// Test authentication
export async function testSupabaseAuth() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    console.log('Current session:', session ? '✅ Authenticated' : '❌ Not authenticated');
    return !!session;
  } catch (error) {
    console.error('Auth test failed:', error);
    return false;
  }
}

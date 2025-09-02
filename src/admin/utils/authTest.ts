import { supabaseClient as supabase } from '../lib/supabase';

export async function createTestUser() {
  if (!supabase) {
    console.log('Supabase not configured, using mock mode');
    return;
  }

  try {
    // Sign up a test user
    const { data, error } = await supabase.auth.signUp({
      email: 'test@rasatech.com',
      password: 'test123456',
      options: {
        data: {
          name: 'Test User'
        }
      }
    });

    if (error) {
      console.error('Signup error:', error);
      return;
    }

    console.log('✅ Test user created:', data.user?.email);
    return data.user;
  } catch (error) {
    console.error('Failed to create test user:', error);
  }
}

export async function signInTestUser() {
  if (!supabase) {
    console.log('Supabase not configured, using mock mode');
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'test@rasatech.com',
      password: 'test123456'
    });

    if (error) {
      console.error('Sign in error:', error);
      return;
    }

    console.log('✅ Signed in as:', data.user?.email);
    return data.user;
  } catch (error) {
    console.error('Failed to sign in:', error);
  }
}

export async function checkAuthStatus() {
  if (!supabase) {
    console.log('Supabase not configured');
    return;
  }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    console.log('Current session:', session ? `✅ ${session.user.email}` : '❌ Not authenticated');
    return session;
  } catch (error) {
    console.error('Auth check failed:', error);
  }
}

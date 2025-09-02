import React, { useState } from 'react';
import { supabaseClient as supabase } from '../../lib/supabase';

export const QuickAuth: React.FC = () => {
  const [email, setEmail] = useState('test@rasatech.com');
  const [password, setPassword] = useState('test123456');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  React.useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (!supabase) return;
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
  };

  const signUp = async () => {
    if (!supabase) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: 'Test User' }
        }
      });
      if (error) throw error;
      alert('User created! Check email for confirmation or try signing in.');
    } catch (error: any) {
      alert('Signup error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    if (!supabase) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      setUser(data.user);
      alert('Signed in successfully!');
    } catch (error: any) {
      alert('Sign in error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  };

  if (user) {
    return (
      <div className="fixed top-4 right-4 bg-green-500/20 text-green-300 px-4 py-2 rounded-lg z-50">
        <div className="flex items-center gap-2">
          <span>✅ {user.email}</span>
          <button
            onClick={signOut}
            className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs hover:bg-red-500/30"
          >
            خروج
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-lg z-50">
      <div className="space-y-2">
        <div className="text-sm">برای ذخیره مقاله وارد شوید:</div>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs w-32"
            placeholder="ایمیل"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs w-24"
            placeholder="رمز"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={signIn}
            disabled={isLoading}
            className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs hover:bg-green-500/30"
          >
            ورود
          </button>
          <button
            onClick={signUp}
            disabled={isLoading}
            className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs hover:bg-blue-500/30"
          >
            ثبت‌نام
          </button>
        </div>
      </div>
    </div>
  );
};

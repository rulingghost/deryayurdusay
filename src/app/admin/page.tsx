'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === 'gencayınkarısıderya' && password === 'gencayıcokseviyor') {
      localStorage.setItem('admin_auth', 'true'); 
      router.push('/admin/dashboard');
    } else {
      setError('Hatalı kullanıcı adı veya şifre!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-studio p-4">
      <div className="glass p-8 md:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-serif font-bold">Yönetici Girişi</h1>
          <p className="text-gray-500 mt-2">Derya Yurdusay Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
             <input
              type="text"
              placeholder="Kullanıcı Adı"
              className="w-full p-4 rounded-xl border border-primary/20 bg-white/50 focus:ring-2 focus:ring-primary/40 outline-none transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
             <input
              type="password"
              placeholder="Şifre"
              className="w-full p-4 rounded-xl border border-primary/20 bg-white/50 focus:ring-2 focus:ring-primary/40 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="glitter-btn w-full p-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Giriş Yap
          </button>
          
          <p className="text-xs text-center text-gray-400 mt-4">
            Kullanıcı: gencayınkarısıderya | Şifre: gencayıcokseviyor
          </p>
        </form>
      </div>
    </div>
  );
}

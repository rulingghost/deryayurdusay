'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Key, Sparkles, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a bit of loading for premium feel
    setTimeout(() => {
      if (username === 'gencayınkarısıderya' && password === 'gencayıcokseviyor') {
        localStorage.setItem('admin_auth', 'true'); 
        router.push('/admin/dashboard');
      } else {
        setError('Hatalı kullanıcı adı veya şifre!');
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-pink-soft p-4 md:p-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
         <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
         <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10"
      >
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors mb-10 group"
        >
           <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Geri Dön
        </Link>

        <div className="bg-white rounded-[48px] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-white relative overflow-hidden">
           {/* Form Header */}
           <div className="text-center mb-12">
              <div className="w-20 h-20 bg-primary/10 rounded-[28px] flex items-center justify-center mx-auto mb-6 text-primary relative">
                 <Lock size={32} />
                 <motion.div 
                   animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                   transition={{ repeat: Infinity, duration: 2 }}
                   className="absolute inset-0 bg-primary/20 rounded-[28px]"
                 />
              </div>
              <h1 className="text-3xl font-black tracking-tighter uppercase text-gray-800">Yönetici <span className="text-primary">Paneli</span></h1>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">Derya Yurdusay Nail Art</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                 <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      type="text"
                      placeholder="KULLANICI ADI"
                      className="w-full pl-14 pr-6 py-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-black text-gray-700 text-sm tracking-widest placeholder:text-gray-300 uppercase"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                    />
                 </div>
                 <div className="relative group">
                    <Key className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      type="password"
                      placeholder="ŞİFRE"
                      className="w-full pl-14 pr-6 py-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-black text-gray-700 text-sm tracking-widest placeholder:text-gray-300"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                 </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center bg-red-50 p-4 rounded-2xl border border-red-100"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="glitter-btn w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isSubmitting ? (
                   <div className="w-5 h-5 border-3 border-white/30 border-t-white animate-spin rounded-full"></div>
                ) : (
                   <>Sisteme Giriş Yap <Sparkles size={16} /></>
                )}
              </button>
              
              <div className="pt-6 text-center">
                 <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest opacity-50">
                   Sadece yetkili personel erişebilir.
                 </p>
              </div>
           </form>
        </div>

        {/* Credentials hints (optional, usually delete for production) */}
        <div className="mt-8 flex justify-center">
           <div className="px-6 py-3 bg-white/50 backdrop-blur-sm rounded-full border border-white/20 text-[10px] font-black text-gray-400 tracking-widest uppercase">
              Admin: gencayınkarısıderya | Şifre: gencayıcokseviyor
           </div>
        </div>
      </motion.div>
    </div>
  );
}

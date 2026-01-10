'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Key, Sparkles, ChevronLeft, Eye, EyeOff, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotTip, setShowForgotTip] = useState(false);
  const router = useRouter();

  // Check if already authenticated via session or localStorage
  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_auth') || localStorage.getItem('admin_auth');
    if (isAuth === 'true') {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Simulate a bit of loading for premium feel
    setTimeout(() => {
      // Note: These should ideally be in env variables and checked via a server action or API
      if (username === 'gencayınkarısıderya' && password === 'gencayıcokseviyor') {
        sessionStorage.setItem('admin_auth', 'true'); 
        if (rememberMe) {
          localStorage.setItem('admin_auth', 'true');
        }
        router.push('/admin/dashboard');
      } else {
        setError('Girdiğiniz bilgiler sistem kayıtlarıyla eşleşmedi.');
        setIsSubmitting(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF8F9] p-4 md:p-8 relative overflow-hidden">
      {/* Background Decor - More sophisticated */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
         <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-primary/3 rounded-full blur-[120px]"></div>
         <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] bg-gold/5 rounded-full blur-[100px]"></div>
         <div className="absolute -bottom-[10%] left-[10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[80px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[460px] z-10"
      >
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all mb-8 group"
        >
           <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
             <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> 
           </div>
           SİTEYE DÖN
        </Link>

        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white/50 relative overflow-hidden">
           {/* Form Header */}
           <div className="text-center mb-10">
              <div className="w-24 h-24 bg-primary/5 rounded-[32px] flex items-center justify-center mx-auto mb-6 text-primary relative">
                 <div className="absolute inset-0 bg-primary/10 rounded-[32px] animate-pulse"></div>
                 <Lock size={36} className="relative z-10" />
                 <motion.div 
                    animate={{ 
                      scale: [1, 1.15, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -top-1 -right-1"
                 >
                    <Sparkles className="text-gold" size={20} />
                 </motion.div>
              </div>
              <h1 className="text-3xl font-black tracking-tighter uppercase text-gray-800">Yönetici <span className="text-primary">Erişimi</span></h1>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-3">Derya Yurdusay Nail Art Studio</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-4">
                 <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-300 group-focus-within:text-primary transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder="KULLANICI ADI"
                      className="w-full pl-14 pr-6 py-5 rounded-2xl bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-gray-700 text-xs tracking-widest placeholder:text-gray-300 uppercase"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setError('');
                      }}
                      autoComplete="username"
                    />
                 </div>
                 
                 <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-300 group-focus-within:text-primary transition-colors">
                      <Key size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="GÜVENLİK ŞİFRESİ"
                      className="w-full pl-14 pr-14 py-5 rounded-2xl bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-gray-700 text-xs tracking-widest placeholder:text-gray-300"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                      autoComplete="current-password"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                 </div>
              </div>

              <div className="flex items-center justify-between px-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative w-4 h-4 rounded border border-gray-200 bg-gray-50 group-hover:border-primary/30 transition-colors">
                    <input 
                      type="checkbox" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <div className={`absolute inset-0.5 bg-primary transition-transform rounded-[2px] ${rememberMe ? 'scale-100' : 'scale-0'}`} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-gray-600 transition-colors">Beni Hatırla</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => setShowForgotTip(!showForgotTip)}
                  className="text-[10px] font-bold text-primary/60 hover:text-primary uppercase tracking-wider transition-colors"
                >
                  Şifremi Unuttum?
                </button>
              </div>

              <AnimatePresence>
                {showForgotTip && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-primary/5 rounded-2xl p-4 flex gap-3 items-start border border-primary/10">
                      <Info size={16} className="text-primary shrink-0 mt-0.5" />
                      <p className="text-[10px] leading-relaxed text-gray-600 font-medium">
                        Güvenlik nedeniyle şifre sıfırlama işlemi manuel yapılmaktadır. Lütfen sistem yöneticisi ile iletişime geçin.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center justify-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="glitter-btn w-full py-5 rounded-[20px] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/10 flex items-center justify-center gap-3 disabled:opacity-70 group"
              >
                {isSubmitting ? (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
                ) : (
                   <>
                    PANELİ AÇ 
                    <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                   </>
                )}
              </button>
              
              <div className="pt-4 text-center">
                 <p className="text-[9px] text-gray-300 font-bold uppercase tracking-[0.2em]">
                    SECURE ADMIN ACCESS POINT
                 </p>
              </div>
           </form>
        </div>

        <div className="mt-8 text-center">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-50">
             &copy; {new Date().getFullYear()} Derya Yurdusay &bull; All Rights Reserved
           </p>
        </div>
      </motion.div>
    </div>
  );
}

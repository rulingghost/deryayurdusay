'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, User, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { optimizeUnsplash } from '@/lib/utils';

export default function BlogSection() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/posts')
      .then(res => res.json())
      .then(data => setPosts(data.slice(0, 3)))
      .catch(err => console.error(err));
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="section-padding bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
          <div>
            <span className="text-primary font-script text-xl md:text-3xl">Tırnak Sağlığı Rehberi</span>
            <h2 className="text-2xl md:text-6xl font-black mt-2 mb-2 md:mb-4 tracking-tighter uppercase">Faydalı <span className="glitter-text">Bilgiler</span></h2>
            <p className="text-gray-400 font-bold text-[10px] md:text-sm tracking-widest uppercase">Güzelliğinizi korumanız için uzman tavsiyeleri</p>
          </div>
          <Link href="/blog" className="group flex items-center gap-2 font-black text-xs uppercase tracking-widest text-primary">
            Tüm Rehberi Oku <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[16/9] rounded-[20px] overflow-hidden mb-4 bg-gray-50 border-4 border-white shadow-lg">
                  {post.image_url ? (
                    <img 
                      src={optimizeUnsplash(post.image_url, 600, 70)} 
                      alt={post.title} 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : null}
                  
                  {/* Fallback Gradient if image missing or error */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-pink-500/10 flex items-center justify-center ${post.image_url ? 'hidden' : ''}`}>
                     <Sparkles className="text-primary/20" size={40} />
                  </div>

                  <div className="absolute top-3 right-3">
                     <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white">
                        <Sparkles size={14} />
                     </div>
                  </div>
                </div>
                <div className="px-2">
                  <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-primary mb-2">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(post.created_at).toLocaleDateString('tr-TR')}</span>
                    <span className="flex items-center gap-1"><User size={10} /> Derya Yurdusay</span>
                  </div>
                  <h3 className="text-lg md:text-2xl font-black text-gray-800 tracking-tight leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

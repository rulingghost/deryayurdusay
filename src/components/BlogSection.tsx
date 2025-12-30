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
            <span className="text-primary font-script text-3xl">Tırnak Sağlığı Rehberi</span>
            <h2 className="text-4xl md:text-6xl font-black mt-2 mb-4 tracking-tighter uppercase">Faydalı <span className="glitter-text">Bilgiler</span></h2>
            <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">Güzelliğinizi korumanız için uzman tavsiyeleri</p>
          </div>
          <Link href="/blog" className="group flex items-center gap-2 font-black text-xs uppercase tracking-widest text-primary">
            Tüm Rehberi Oku <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post, i) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden mb-8 bg-gray-50 border-8 border-white shadow-xl">
                  <img 
                    src={optimizeUnsplash(post.image_url || 'https://images.unsplash.com/photo-1604654894610-df63bc536371', 600, 70)} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 right-6">
                     <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
                        <Sparkles size={20} />
                     </div>
                  </div>
                </div>
                <div className="px-4">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-primary mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.created_at).toLocaleDateString('tr-TR')}</span>
                    <span className="flex items-center gap-1"><User size={12} /> Derya Yurdusay</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 tracking-tight leading-tight mb-4 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 font-medium leading-relaxed line-clamp-2">
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

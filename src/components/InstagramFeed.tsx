'use client';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { optimizeUnsplash } from '@/lib/utils';

const mockPosts = [
  { 
    id: 1, 
    url: 'https://images.unsplash.com/photo-1604654894610-df490c91550a?q=80&w=500', 
    likes: '1.2b', 
    comments: 48,
    link: 'https://instagram.com/nailarts.deryayurdusay'
  },
  { 
    id: 2, 
    url: 'https://images.unsplash.com/photo-1632345033839-21c88556a9a0?q=80&w=500', 
    likes: 856, 
    comments: 24,
    link: 'https://instagram.com/nailarts.deryayurdusay'
  },
  { 
    id: 3, 
    url: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=500', 
    likes: '2.4b', 
    comments: 112,
    link: 'https://instagram.com/nailarts.deryayurdusay'
  },
];

export default function InstagramFeed() {
  return (
    <section className="py-24 bg-bg-pink-soft">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 text-pink-500 mb-4">
               <Instagram size={24} />
               <span className="font-black uppercase tracking-[0.2em] text-sm">@nailarts.deryayurdusay</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Instagram'da <span className="glitter-text">Keşfedin</span></h2>
          </div>
          <a 
            href="https://instagram.com/nailarts.deryayurdusay" 
            target="_blank" 
            className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-gray-400 hover:text-primary transition-colors"
          >
             Hemen Takip Et <ExternalLink size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {mockPosts.map((post, i) => (
             <motion.a
               key={post.id}
               href={post.link}
               target="_blank"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="group relative aspect-square rounded-[40px] overflow-hidden bg-gray-100"
             >
                <img 
                   src={optimizeUnsplash(post.url, 600, 70)} 
                   alt="Instagram Post" 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-8 text-white backdrop-blur-[2px]">
                   <div className="flex items-center gap-2">
                      <Heart size={20} fill="currentColor" />
                      <span className="font-bold">{post.likes}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <MessageCircle size={20} fill="currentColor" />
                      <span className="font-bold">{post.comments}</span>
                   </div>
                </div>
             </motion.a>
           ))}
        </div>
      </div>
    </section>
  );
}

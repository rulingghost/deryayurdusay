'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, ZoomIn, Search, Sparkles, ImageIcon } from 'lucide-react';
import { optimizeUnsplash } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'Tümü' },
  { id: 'art', label: 'Nail Art' },
  { id: 'protez', label: 'Protez Tırnak' },
  { id: 'french', label: 'French' },
  { id: 'gelin', label: 'Gelin Tırnağı' },
  { id: 'minimalist', label: 'Minimalist' },
  { id: 'neon', label: 'Neon Renkler' },
];

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [filteredImages, setFilteredImages] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        setImages(data);
        setFilteredImages(data);
      }
    } catch (error) {
      console.error('Failed to fetch gallery', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = images;
    if (activeCategory !== 'all') {
      filtered = filtered.filter(img => img.category === activeCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(img => 
        img.caption?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredImages(filtered);
  }, [activeCategory, searchQuery, images]);

  return (
    <section id="gallery" className="section-padding bg-bg-pink-deep relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
          <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 left-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-script text-3xl">Sanat Galerisi</span>
          <h2 className="text-5xl md:text-7xl font-black mt-2 mb-10 tracking-tighter">İlham Veren <span className="text-primary">Tasarımlar</span></h2>
          
          {/* Enhanced Search & Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-5xl mx-auto">
             <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-500 border-2 ${
                      activeCategory === cat.id
                        ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105'
                        : 'bg-white text-gray-400 border-gray-100 hover:border-primary/30 hover:text-primary active:scale-95'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
             </div>
             
             <div className="relative w-full md:w-80 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Hizmetlerde ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border-2 border-gray-50 focus:border-primary outline-none transition-all shadow-sm focus:shadow-xl focus:shadow-primary/5 font-bold text-gray-600"
                />
             </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="relative">
               <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
               <Sparkles className="absolute inset-0 m-auto text-primary" size={20} />
            </div>
            <p className="font-black text-gray-300 uppercase tracking-[0.3em] text-[10px]">Yükleniyor...</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex flex-col items-center justify-center py-40 text-center"
          >
             <div className="w-32 h-32 bg-gray-50 rounded-[40px] flex items-center justify-center text-gray-200 mb-8 border-2 border-dashed border-gray-100">
                <ImageIcon size={48} />
             </div>
             <h3 className="text-3xl font-black text-gray-800 mb-4 tracking-tight">Henüz Fotoğraf Yok</h3>
             <p className="text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
                Stüdyomuzdaki en yeni çalışmaları çok yakında buradan takip edebileceksiniz. Takipte kalın!
              </p>
              <div className="mt-10 flex gap-4">
                 <button onClick={() => {setActiveCategory('all'); setSearchQuery('');}} className="px-10 py-4 bg-white border-2 border-gray-100 rounded-full font-black text-xs uppercase tracking-widest text-gray-400 hover:border-primary hover:text-primary transition-all">Tümünü Göster</button>
              </div>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img) => (
                <motion.div
                  layout
                  key={img.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ y: -10 }}
                  className="relative group cursor-pointer rounded-[40px] overflow-hidden aspect-[4/5] bg-white border-8 border-white shadow-2xl shadow-gray-200/50"
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={optimizeUnsplash(img.image_url, 600, 70)} 
                    alt={img.caption} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end text-white p-10 pb-12">
                    <div className="bg-primary p-4 rounded-2xl mb-6 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 delay-100">
                       <ZoomIn size={24} />
                    </div>
                    <p className="font-black text-2xl tracking-tight translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                       {img.caption}
                    </p>
                    <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mt-2 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-300">
                       {img.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Premium Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1A0F13]/95 flex items-center justify-center p-6 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-10 right-10 text-white hover:text-primary transition-all bg-white/5 p-4 rounded-full border border-white/10 hover:rotate-90"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="max-w-5xl w-full max-h-[85vh] relative flex flex-col md:flex-row bg-white rounded-[50px] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full md:w-2/3 bg-gray-50 flex items-center justify-center relative overflow-hidden group">
                 <img 
                    src={optimizeUnsplash(selectedImage.image_url, 1200, 90)} 
                    alt={selectedImage.caption}
                    className="max-w-full max-h-full object-contain" 
                 />
                 <div className="absolute top-6 left-6 flex gap-2">
                    <span className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-primary tracking-widest border border-primary/20">
                       {selectedImage.category}
                    </span>
                 </div>
              </div>
              <div className="w-full md:w-1/3 p-12 flex flex-col">
                 <div className="mb-10">
                    <p className="text-primary font-script text-2xl mb-2">Derya Yurdusay</p>
                    <h3 className="text-4xl font-black text-gray-800 tracking-tight leading-tight mb-4">{selectedImage.caption}</h3>
                    <div className="w-12 h-1 bg-primary rounded-full"></div>
                 </div>
                 <p className="text-gray-500 font-medium leading-relaxed mb-10">
                    Bu tasarımda kullanılan özel teknikler ve premium ürünlerle elde edilen mükemmel sonuç. Sizin için de benzer bir sanat eseri yaratmamızı ister misiniz?
                 </p>
                 <a href="#booking" onClick={() => setSelectedImage(null)} className="mt-auto glitter-btn w-full py-5 text-sm font-black uppercase tracking-widest">
                    Bu İşlemden Randevu Al
                 </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

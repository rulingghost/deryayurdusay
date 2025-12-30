'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, ZoomIn, Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

const categories = [
  { id: 'all', label: 'Tümü' },
  { id: 'art', label: 'Nail Art' },
  { id: 'protez', label: 'Protez Tırnak' },
  { id: 'french', label: 'French' },
  { id: 'care', label: 'Bakım' },
];

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [filteredImages, setFilteredImages] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const { toggleFavorite, isFavorite } = useFavorites();

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
    if (activeCategory === 'all') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === activeCategory));
    }
  }, [activeCategory, images]);

  return (
    <section id="gallery" className="section-padding relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-primary font-script text-2xl">İlham Alın</span>
          <h2 className="text-3xl md:text-5xl font-serif mt-2 mb-8">Sanat Galerisi</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 rounded-full border transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white border-primary shadow-lg scale-105'
                    : 'bg-transparent border-gray-300 text-gray-500 hover:border-primary hover:text-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredImages.map((img) => (
                <motion.div
                  layout
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group cursor-pointer rounded-3xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-all"
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img.image_url} 
                    alt={img.caption} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 text-center">
                    <button 
                       onClick={(e) => {
                         e.stopPropagation();
                         toggleFavorite(img.id);
                       }}
                       className="absolute top-4 right-4 p-2 text-white hover:text-red-500 transition-colors"
                    >
                      <Heart size={24} fill={isFavorite(img.id) ? "currentColor" : "none"} className={isFavorite(img.id) ? "text-red-500" : ""} />
                    </button>
                    <ZoomIn size={32} className="mb-2" />
                    <p className="font-bold text-lg">{img.caption}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors bg-white/10 p-2 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.image_url} 
                alt={selectedImage.caption}
                className="max-w-full max-h-[85vh] rounded-lg shadow-2xl" 
              />
              <div className="bg-white/10 backdrop-blur-md text-white p-4 rounded-b-lg absolute bottom-0 w-full">
                 <h3 className="font-bold text-xl">{selectedImage.caption}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

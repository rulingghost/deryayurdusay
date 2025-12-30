'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ScanEye, ChevronLeft, ChevronRight } from 'lucide-react';
import { optimizeUnsplash } from '@/lib/utils';

export default function BeforeAfter() {
  const [items, setItems] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);

  useEffect(() => {
    fetch('/api/before-after')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  const next = () => setCurrentIndex((currentIndex + 1) % items.length);
  const prev = () => setCurrentIndex((currentIndex - 1 + items.length) % items.length);

  return (
    <section className="py-24 bg-bg-studio overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-script text-3xl">Gözle Görülür Değişim</span>
          <h2 className="text-4xl md:text-6xl font-black mt-2 mb-4 tracking-tighter uppercase">Öncesi & <span className="glitter-text">Sonrası</span></h2>
          <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">Mucizevi dönüşümlere tanık olun</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative"
            >
              <div 
                className="relative aspect-video rounded-[48px] overflow-hidden shadow-2xl border-8 border-white cursor-ew-resize select-none"
                onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
                onMouseDown={handleMove}
                onTouchMove={handleMove}
              >
                {/* After Image (Background) */}
                <img src={optimizeUnsplash(currentItem.after_url, 1200, 80)} className="absolute inset-0 w-full h-full object-cover" alt="After" />
                
                {/* Before Image (Clipping) */}
                <div 
                  className="absolute inset-0 w-full h-full object-cover overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img src={optimizeUnsplash(currentItem.before_url, 1200, 80)} className="absolute inset-0 w-full h-full object-cover" alt="Before" />
                  <div className="absolute top-10 left-10 bg-black/40 backdrop-blur-md text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest border border-white/20 shadow-xl">Öncesi</div>
                </div>

                <div className="absolute top-10 right-10 bg-primary/80 backdrop-blur-md text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest border border-white/20 shadow-xl">Sonrası</div>

                {/* Slider Handle */}
                <div 
                  className="absolute inset-y-0 w-1 bg-white shadow-xl cursor-ew-resize"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-primary border-4 border-primary">
                    <ScanEye size={20} />
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                 <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">{currentItem.title}</h3>
              </div>
            </motion.div>
          </AnimatePresence>

          {items.length > 1 && (
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 -right-4 flex justify-between pointer-events-none">
              <button onClick={prev} className="p-4 bg-white rounded-full shadow-2xl text-primary hover:bg-primary hover:text-white transition-all pointer-events-auto">
                <ChevronLeft size={24} />
              </button>
              <button onClick={next} className="p-4 bg-white rounded-full shadow-2xl text-primary hover:bg-primary hover:text-white transition-all pointer-events-auto">
                <ChevronRight size={24} />
              </button>
            </div>
          )}
          
          <div className="mt-12 flex items-center justify-center gap-4 text-gray-400 font-bold text-xs uppercase tracking-[0.3em]">
             <Sparkles size={16} className="text-primary" />
             Sürükleyerek Farkı Görün
             <Sparkles size={16} className="text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}

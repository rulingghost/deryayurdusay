'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, X, Move } from 'lucide-react';

// Mock nail designs
const nailStyles = [
  { id: 1, name: 'Klasik Kırmızı', color: '#D45A8A', type: 'color' },
  { id: 2, name: 'Gece Mavisi', color: '#1A237E', type: 'color' },
  { id: 3, name: 'Altın Işıltı', color: '#D4AF37', type: 'glitter' },
  { id: 4, name: 'Doğal French', color: '#F9F0D1', type: 'french' },
  { id: 5, name: 'Siyah Mat', color: '#2D1B22', type: 'color' },
  { id: 6, name: 'Bebek Mavisi', color: '#90CAF9', type: 'color' },
];

export default function VirtualTryOn() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [nails, setNails] = useState<{ id: number; x: number; y: number; styleId: number }[]>([]);
  const [activeStyle, setActiveStyle] = useState(nailStyles[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setNails([]); // Reset nails on new image
      };
      reader.readAsDataURL(file);
    }
  };

  const addNail = () => {
    // Add a new nail sticker to the center of the container
    if (!containerRef.current) return;
    const centerX = containerRef.current.offsetWidth / 2 - 20; // 20 is approx half nail width
    const centerY = containerRef.current.offsetHeight / 2 - 30; // 30 is approx half nail height
    
    setNails([
      ...nails,
      {
        id: Date.now(),
        x: centerX, // Start center
        y: centerY,
        styleId: activeStyle.id,
      },
    ]);
  };

  const updateNailPosition = (id: number, x: number, y: number) => {
    setNails(nails.map((n) => (n.id === id ? { ...n, x, y } : n)));
  };

  const removeNail = (id: number) => {
    setNails(nails.filter((n) => n.id !== id));
  };

  // Simple drag logic
  const handleDragStart = (e: React.MouseEvent, id: number) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const nail = nails.find((n) => n.id === id);
    if (!nail) return;
    const initialNoteX = nail.x;
    const initialNoteY = nail.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      updateNailPosition(id, initialNoteX + dx, initialNoteY + dy);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  // Touch support for mobile
  const handleTouchStart = (e: React.TouchEvent, id: number) => {
    const startX = e.touches[0].clientX;
    const startY = e.touches[0].clientY;
    const nail = nails.find((n) => n.id === id);
    if (!nail) return;
    const initialNoteX = nail.x;
    const initialNoteY = nail.y;

    const handleTouchMove = (moveEvent: TouchEvent) => {
        const dx = moveEvent.touches[0].clientX - startX;
        const dy = moveEvent.touches[0].clientY - startY;
        updateNailPosition(id, initialNoteX + dx, initialNoteY + dy);
    };

    const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove as any);
        document.removeEventListener('touchend', handleTouchEnd as any);
    };

    document.addEventListener('touchmove', handleTouchMove as any, { passive: false });
    document.addEventListener('touchend', handleTouchEnd as any);
  };


  return (
    <section id="try-on" className="section-padding bg-bg-studio overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-primary font-script text-2xl">Sanal Deneme</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-2 mb-4">Tarzını Yarat</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            El fotoğrafını yükle, dilediğin tırnak modelini seç ve parmaklarına yerleştir! 
            Hayalindeki tırnakları randevudan önce tasarla.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Controls Side */}
          <div className="w-full lg:w-1/3 glass p-8">
            <h3 className="text-xl font-serif mb-6 flex items-center gap-2">
              <Camera className="text-primary" />
              1. Fotoğraf Yükle
            </h3>
            
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-xl cursor-pointer hover:bg-primary/5 transition-colors mb-8">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 text-primary/50 mb-2" />
                <p className="text-sm text-gray-500">Tıkla veya sürükle</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>

            <h3 className="text-xl font-serif mb-4">2. Model Seç</h3>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {nailStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setActiveStyle(style)}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    activeStyle.id === style.id 
                      ? 'border-primary scale-110 shadow-md' 
                      : 'border-transparent hover:border-primary/30'
                  }`}
                >
                  <div 
                    className="w-full h-10 rounded-full shadow-sm mx-auto mb-1"
                    style={{ backgroundColor: style.color }}
                  ></div>
                  <span className="text-xs block text-center truncate">{style.name}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={addNail}
              disabled={!selectedImage}
              className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                selectedImage 
                  ? 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-primary/30' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Move size={20} />
              Tırnak Ekle (+1)
            </button>
            <p className="text-xs text-center mt-2 text-gray-500">
              *Önce fotoğraf yükleyin, sonra tırnak ekleyip parmaklarınızın üzerine sürükleyin.
            </p>
          </div>

          {/* Preview Area */}
          <div className="w-full lg:w-2/3">
            <div 
              ref={containerRef}
              className="relative w-full aspect-[4/5] md:aspect-video rounded-3xl overflow-hidden glass shadow-2xl bg-white/50 border-4 border-white"
            >
              {selectedImage ? (
                <>
                  <img 
                    src={selectedImage} 
                    alt="Uploaded Hand" 
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                  {/* Overlay Helper Text */}
                  {nails.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-black/50 text-white px-6 py-3 rounded-full backdrop-blur-md">
                        Tırnak eklemek için butona bas!
                      </div>
                    </div>
                  )}

                  {/* Interacive Nails */}
                  {nails.map((nail) => {
                    const style = nailStyles.find(s => s.id === nail.styleId) || nailStyles[0];
                    return (
                      <div
                        key={nail.id}
                        onMouseDown={(e) => handleDragStart(e, nail.id)}
                        onTouchStart={(e) => handleTouchStart(e, nail.id)}
                        className="absolute cursor-move group"
                        style={{ 
                          left: nail.x, 
                          top: nail.y,
                          width: '40px',
                          height: '60px',
                          touchAction: 'none', 
                        }}
                      >
                         {/* Nail Shape */}
                        <div 
                           className="w-full h-full rounded-[50%_50%_40%_40%] shadow-md opacity-90 border border-white/20"
                           style={{ backgroundColor: style.color }}
                        >
                            {/* Reflection/Shine effect */}
                            <div className="absolute top-2 left-2 w-1/3 h-1/3 bg-gradient-to-br from-white/80 to-transparent rounded-full blur-[1px]"></div>
                        </div>

                        {/* Delete Button (visible on hover) */}
                        <button
                          onClick={() => removeNail(nail.id)}
                          className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity shadow-sm scale-75"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <Camera size={64} className="mb-4 opacity-50" />
                  <p className="text-xl font-medium">Fotoğraf Yüklenmeyi Bekliyor</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

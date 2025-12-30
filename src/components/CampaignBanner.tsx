'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Tag } from 'lucide-react';

export default function CampaignBanner() {
  const [activeCampaign, setActiveCampaign] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch('/api/admin/campaigns')
      .then(res => res.json())
      .then(data => {
        const active = data.find((c: any) => c.active);
        if (active) {
          setActiveCampaign(active);
          // Show after 2 seconds
          setTimeout(() => setIsVisible(true), 2000);
        }
      });
  }, []);

  if (!activeCampaign) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-32 md:w-[400px] z-[100]"
        >
          <div className="bg-white rounded-[32px] p-6 shadow-2xl shadow-primary/20 border border-primary/10 relative overflow-hidden group">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
             
             <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 p-2 bg-gray-50 text-gray-400 hover:text-primary rounded-full transition-colors z-10"
             >
                <X size={16} />
             </button>

             <div className="relative flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
                   <Sparkles size={24} />
                </div>
                <div className="flex-1">
                   <h4 className="text-sm font-black text-primary uppercase tracking-[0.1em] mb-1">Özel Duyuru</h4>
                   <h3 className="text-xl font-black text-gray-800 leading-tight mb-2">{activeCampaign.title}</h3>
                   <p className="text-gray-500 text-sm font-medium leading-relaxed mb-4">{activeCampaign.description}</p>
                   
                   {activeCampaign.code && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-dashed border-primary/30">
                         <div className="flex items-center gap-2">
                            <Tag size={14} className="text-primary" />
                            <span className="text-xs font-black text-gray-400 uppercase tracking-tighter">İndirim Kodu:</span>
                         </div>
                         <span className="text-sm font-black text-primary select-all cursor-pointer">{activeCampaign.code}</span>
                      </div>
                   )}
                </div>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

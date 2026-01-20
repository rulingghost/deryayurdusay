'use client';
import { useState } from 'react';
import { optimizeUnsplash } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

export default function BlogHeroImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  // Default fallback image if src is missing or fails
  const fallbackImage = 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=1200&auto=format&fit=crop';
  
  // Use optimized URL mostly, but fallback if error occurs
  const imageUrl = !src ? fallbackImage : (error ? fallbackImage : optimizeUnsplash(src, 1200, 80));

  return (
    <div className="absolute inset-0 z-0 bg-gray-900">
        <div className="absolute inset-0 bg-black/50 z-10 transition-opacity"></div>
        <img 
            src={imageUrl} 
            className="w-full h-full object-cover opacity-80"
            alt={alt}
            onError={() => setError(true)}
        />
        {/* Decorative pattern if image is totally failing or just as overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10"></div>
    </div>
  );
}

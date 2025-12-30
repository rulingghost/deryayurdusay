'use client';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const message = "Merhaba! Randevu almak veya bilgi almak istiyorum. 💅";
  const whatsappUrl = `https://wa.me/905540265767?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
    >
      <MessageCircle size={32} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap ml-0 group-hover:ml-3 font-bold">
        Hemen Yazın
      </span>
      {/* Pulse Effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] -z-10 animate-ping opacity-75"></span>
    </a>
  );
}

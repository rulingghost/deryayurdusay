import { getPostBySlug } from '@/lib/db';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowLeft, Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import BlogHeroImage from '@/components/BlogHeroImage';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image_url],
      type: 'article',
      authors: ['Derya Yurdusay'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image_url],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="bg-bg-studio min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
         <BlogHeroImage src={post.image_url} alt={post.title} />
         <div className="relative z-20 container mx-auto px-6 text-center mt-10 md:mt-0">
            <Link 
               href="/blog" 
               className="inline-flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-white/80 hover:text-white transition-all bg-white/10 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-full mb-6 md:mb-10 border border-white/20"
            >
               <ArrowLeft size={14} /> Rehbere Dön
            </Link>
            <h1 className="text-2xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight max-w-4xl mx-auto drop-shadow-2xl px-2">
               {post.title}
            </h1>
         </div>
      </section>

      {/* Content Section */}
      <section className="py-24 -mt-32 relative z-30">
         <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-[60px] p-8 md:p-20 shadow-2xl shadow-gray-200/50">
               <div className="flex flex-wrap items-center gap-10 border-b border-gray-100 pb-10 mb-10 justify-center">
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <Calendar size={20} />
                     </div>
                     <div>
                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Yayınlanma</span>
                        <span className="block font-black text-gray-800">{new Date(post.created_at).toLocaleDateString('tr-TR')}</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <User size={20} />
                     </div>
                     <div>
                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Yazar</span>
                        <span className="block font-black text-gray-800">Derya Yurdusay</span>
                     </div>
                  </div>
               </div>

               <div className="prose prose-xl prose-pink max-w-none font-medium text-gray-600 leading-relaxed">
                  {/* For demo, we just split by double newline and wrap in p tags */}
                  {post.content.split('\n\n').map((para: string, i: number) => (
                    <p key={i} className="mb-6">{para}</p>
                  ))}
               </div>

               <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-[24px] flex items-center justify-center text-white shadow-lg">
                        <Heart size={32} fill="currentColor" />
                     </div>
                     <div>
                        <h4 className="font-black text-gray-800 uppercase tracking-tighter text-xl leading-none">Derya Yurdusay</h4>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Nail Art Professional</span>
                     </div>
                  </div>
                  <a href={`https://wa.me/905540265767?text=${encodeURIComponent('Merhaba! Blog yazınızı okudum, randevu almak istiyorum. 💅')}`} target="_blank" rel="noopener noreferrer" className="glitter-btn px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest">
                     WhatsApp ile Yazın
                  </a>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Check, X, FileText, Image as ImageIcon } from 'lucide-react';

export default function PostManager() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newForm, setNewForm] = useState({ title: '', slug: '', excerpt: '', content: '', image_url: '' });

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    const res = await fetch('/api/admin/posts');
    if (res.ok) setPosts(await res.json());
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newForm),
    });
    if (res.ok) { setNewForm({ title: '', slug: '', excerpt: '', content: '', image_url: '' }); fetchPosts(); }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Emin misiniz?')) return;
    await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-8 text-primary">
          <FileText size={24} />
          <h3 className="text-xl font-black uppercase tracking-tight">Yeni Blog Yazısı / Rehber İçeriği</h3>
        </div>
        <form onSubmit={handleAdd} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block ml-4">Yazı Başlığı</label>
               <input 
                  type="text" 
                  placeholder="Örn: Protez Tırnak Sonrası Bakım" 
                  value={newForm.title} 
                  onChange={(e) => setNewForm({...newForm, title: e.target.value, slug: generateSlug(e.target.value)})} 
                  className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" 
                  required 
               />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block ml-4">URL Uzantısı (Slug)</label>
               <input 
                  type="text" 
                  placeholder="protez-tirnak-bakimi" 
                  value={newForm.slug} 
                  onChange={(e) => setNewForm({...newForm, slug: e.target.value})} 
                  className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold text-primary" 
                  required 
               />
            </div>
          </div>
          
          <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block ml-4">Kısa Özet</label>
             <input 
               type="text" 
               placeholder="Arama sonuçlarında görünecek kısa açıklama" 
               value={newForm.excerpt} 
               onChange={(e) => setNewForm({...newForm, excerpt: e.target.value})} 
               className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" 
             />
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block ml-4">İçerik (Markdown desteklemez, düz metin/paragraflar arası boşluk bırakın)</label>
             <textarea 
               placeholder="Yazı içeriği..." 
               value={newForm.content} 
               onChange={(e) => setNewForm({...newForm, content: e.target.value})} 
               className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold min-h-[300px]" 
               required 
             />
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block ml-4">Görsel URL</label>
             <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type="text" 
                  placeholder="https://images.unsplash.com/..." 
                  value={newForm.image_url} 
                  onChange={(e) => setNewForm({...newForm, image_url: e.target.value})} 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" 
                />
             </div>
          </div>

          <button type="submit" disabled={loading} className="glitter-btn px-12 py-5 rounded-2xl font-black uppercase tracking-widest w-full">Yazıyı Yayınla</button>
        </form>
      </div>

      <div className="grid gap-6">
        {posts.map(post => (
          <div key={post.id} className="p-6 bg-white rounded-[32px] border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
             <div className="flex items-center gap-5">
                <img src={post.image_url || 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=200'} className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                  <h4 className="text-lg font-black text-gray-800">{post.title}</h4>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">{post.slug}</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <button onClick={() => handleDelete(post.id)} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                   <Trash2 size={20} />
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

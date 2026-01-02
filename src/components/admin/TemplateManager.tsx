'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Plus, Trash2, Edit2, MessageSquare, Info } from 'lucide-react';

export default function TemplateManager({ templates, onRefresh }: { templates: any[], onRefresh: () => void }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', content: '' });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingId) {
        await fetch(`/api/admin/templates/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch('/api/admin/templates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      setEditingId(null);
      setFormData({ name: '', content: '' });
      setIsFormOpen(false);
      onRefresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu şablonu silmek istediğinize emin misiniz?')) return;
    try {
        await fetch(`/api/admin/templates/${id}`, { method: 'DELETE' });
        onRefresh();
    } catch(e) { console.error(e); }
  };

  const openEdit = (t: any) => {
    setEditingId(t.id);
    setFormData({ name: t.name, content: t.content });
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-black text-gray-800">Mesaj Şablonları</h2>
           <p className="text-gray-400 text-sm font-medium">WhatsApp otomatik mesajlarınızı buradan yönetebilirsiniz.</p>
        </div>
        <button 
          onClick={() => { setEditingId(null); setFormData({ name: '', content: '' }); setIsFormOpen(!isFormOpen); }}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
        >
          {isFormOpen ? 'Kapat' : <><Plus size={20} /> Yeni Şablon</>}
        </button>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
             <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col gap-6">
                <div className="bg-blue-50 p-4 rounded-2xl flex items-start gap-3 text-blue-600 text-xs font-bold leading-relaxed">
                   <Info size={20} className="shrink-0" />
                   <p>Mesaj içeriğinde dinamik veriler kullanabilirsiniz:<br/>
                   <span className="bg-white px-1.5 py-0.5 rounded border border-blue-100 mr-1 text-blue-800">{`{name}`}</span> Müşteri Adı<br/>
                   <span className="bg-white px-1.5 py-0.5 rounded border border-blue-100 mr-1 text-blue-800">{`{date}`}</span> Randevu Tarihi<br/>
                   <span className="bg-white px-1.5 py-0.5 rounded border border-blue-100 mr-1 text-blue-800">{`{time}`}</span> Randevu Saati
                   </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                   <div className="col-span-1">
                      <label className="text-xs font-black uppercase text-gray-400 mb-2 block ml-2">Şablon Adı</label>
                      <input 
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full p-4 bg-gray-50 rounded-2xl font-bold text-gray-700 outline-none focus:bg-white focus:ring-2 ring-primary/20 transition-all placeholder:text-gray-300"
                        placeholder="Örn: Standart Onay"
                      />
                   </div>
                   <div className="col-span-2">
                      <label className="text-xs font-black uppercase text-gray-400 mb-2 block ml-2">Mesaj İçeriği</label>
                      <textarea
                        required
                        value={formData.content}
                        onChange={e => setFormData({...formData, content: e.target.value})}
                        rows={4}
                        className="w-full p-4 bg-gray-50 rounded-2xl font-medium text-gray-600 outline-none focus:bg-white focus:ring-2 ring-primary/20 transition-all resize-none placeholder:text-gray-300 text-sm leading-relaxed"
                        placeholder="Mesaj metnini buraya yazın..."
                      />
                   </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit" disabled={loading} className="px-8 py-4 bg-primary text-white rounded-2xl font-black flex items-center gap-2 hover:bg-primary-dark transition-colors disabled:opacity-50">
                     {loading ? 'Kaydediliyor...' : <><Save size={20} /> {editingId ? 'Güncelle' : 'Kaydet'}</>}
                  </button>
                </div>
             </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t) => (
           <div key={t.id} className="group bg-white p-6 rounded-[32px] border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 hover:border-primary/20 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 bg-gradient-to-l from-white via-white to-transparent pl-8">
                 <button onClick={() => openEdit(t)} className="p-2 bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
                 <button onClick={() => handleDelete(t.id)} className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <MessageSquare size={20} />
                 </div>
                 <h3 className="font-bold text-gray-800 text-lg">{t.name}</h3>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none">
                 <p className="text-xs text-gray-500 leading-relaxed active-template-content whitespace-pre-wrap font-medium">
                    {t.content}
                 </p>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
}

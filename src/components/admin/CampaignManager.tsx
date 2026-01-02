'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Check, X, Megaphone, ToggleLeft, ToggleRight } from 'lucide-react';

interface Campaign {
  id: number;
  title: string;
  description: string;
  code: string;
  discount_percent: number;
  start_date: string;
  end_date: string;
  active: boolean;
}

export default function CampaignManager() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', code: '', discount_percent: 0, start_date: '', end_date: '', active: true });
  const [newForm, setNewForm] = useState({ title: '', description: '', code: '', discount_percent: 0, start_date: '', end_date: '', active: true });
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchCampaigns(); }, []);

  const fetchCampaigns = async () => {
    const res = await fetch('/api/admin/campaigns');
    if (res.ok) setCampaigns(await res.json());
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newForm),
    });
    if (res.ok) { 
        setNewForm({ title: '', description: '', code: '', discount_percent: 0, start_date: '', end_date: '', active: true }); 
        fetchCampaigns(); 
    }
    setLoading(false);
  };

  const handleUpdate = async (id: number) => {
    setLoading(true);
    const res = await fetch('/api/admin/campaigns', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...editForm }),
    });
    if (res.ok) { setEditingId(null); fetchCampaigns(); }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Emin misiniz?')) return;
    await fetch(`/api/admin/campaigns/${id}`, { method: 'DELETE' });
    fetchCampaigns();
  };

  const toggleActive = async (camp: Campaign) => {
    await fetch('/api/admin/campaigns', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...camp, active: !camp.active }),
    });
    fetchCampaigns();
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6 text-primary">
          <Plus size={24} />
          <h3 className="text-xl font-black">Yeni Kampanya / Duyuru</h3>
        </div>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
             <input type="text" placeholder="Başlık (Örn: Sevgililer Günü)" value={newForm.title} onChange={(e) => setNewForm({...newForm, title: e.target.value})} className="p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold w-full" required />
             <input type="text" placeholder="Açıklama" value={newForm.description} onChange={(e) => setNewForm({...newForm, description: e.target.value})} className="p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="İndirim Kodu" value={newForm.code} onChange={(e) => setNewForm({...newForm, code: e.target.value})} className="p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold w-full" />
            <input type="number" placeholder="% İndirim" value={newForm.discount_percent || ''} onChange={(e) => setNewForm({...newForm, discount_percent: parseInt(e.target.value) || 0})} className="p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <input type="date" placeholder="Başlangıç" value={newForm.start_date} onChange={(e) => setNewForm({...newForm, start_date: e.target.value})} className="p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold text-gray-500 w-full" />
             <input type="date" placeholder="Bitiş" value={newForm.end_date} onChange={(e) => setNewForm({...newForm, end_date: e.target.value})} className="p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold text-gray-500 w-full" />
          </div>
          <button type="submit" disabled={loading} className="lg:col-span-4 glitter-btn px-6 py-4 rounded-2xl font-black mt-2">Kampanya Ekle</button>
        </form>
      </div>

      <div className="grid gap-6">
        {campaigns.map(camp => (
          <div key={camp.id} className={`p-6 bg-white rounded-[32px] border-2 transition-all ${camp.active ? 'border-primary/20 shadow-lg shadow-primary/5' : 'border-gray-100 opacity-80'}`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div className="flex items-center gap-5 flex-1 w-full">
                  <div className={`p-4 rounded-2xl shrink-0 ${camp.active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                     <Megaphone size={24} />
                  </div>
                  {editingId === camp.id ? (
                     <div className="flex flex-col gap-3 w-full">
                        <div className="grid grid-cols-2 gap-2">
                           <input type="text" value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} className="font-black text-lg p-2 border-b-2 border-primary outline-none" placeholder="Başlık" />
                           <input type="number" value={editForm.discount_percent} onChange={(e) => setEditForm({...editForm, discount_percent: parseInt(e.target.value) || 0})} className="font-bold text-lg p-2 border-b border-gray-200 outline-none" placeholder="%" />
                        </div>
                        <input type="text" value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} className="text-sm p-2 border-b outline-none" placeholder="Açıklama" />
                        <div className="grid grid-cols-3 gap-2">
                            <input type="text" value={editForm.code} onChange={(e) => setEditForm({...editForm, code: e.target.value})} className="text-xs p-2 border-b outline-none bg-gray-50" placeholder="Kod" />
                            <input type="date" value={editForm.start_date} onChange={(e) => setEditForm({...editForm, start_date: e.target.value})} className="text-xs p-2 border-b outline-none text-gray-400" />
                            <input type="date" value={editForm.end_date} onChange={(e) => setEditForm({...editForm, end_date: e.target.value})} className="text-xs p-2 border-b outline-none text-gray-400" />
                        </div>
                     </div>
                  ) : (
                     <div className="flex-1">
                        <div className="flex items-center gap-3">
                             <h4 className="text-xl font-black text-gray-800">{camp.title}</h4>
                             {camp.active ? <span className="text-[9px] font-black uppercase text-green-500 bg-green-50 px-2 py-0.5 rounded-full">Aktif</span> : <span className="text-[9px] font-black uppercase text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Pasif</span>}
                        </div>
                        <p className="text-gray-400 font-bold text-sm mb-2">{camp.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {camp.code && <span className="inline-block px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-black">KOD: {camp.code}</span>}
                            {camp.discount_percent > 0 && <span className="inline-block px-3 py-1 bg-red-50 text-red-500 rounded-full text-xs font-black">%{camp.discount_percent} İNDİRİM</span>}
                            {camp.start_date && camp.end_date && (
                                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-bold">
                                    {new Date(camp.start_date).toLocaleDateString('tr-TR')} - {new Date(camp.end_date).toLocaleDateString('tr-TR')}
                                </span>
                            )}
                        </div>
                     </div>
                  )}
               </div>
               
               <div className="flex items-center justify-between w-full md:w-auto gap-3 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 shrink-0">
                  <div className="flex items-center gap-2 mr-4">
                      <span className="text-[10px] font-black uppercase text-gray-400">{camp.active ? 'Yayında' : 'Gizli'}</span>
                      <button 
                        onClick={() => toggleActive(camp)} 
                        className={`w-12 h-7 rounded-full p-1 transition-colors relative ${camp.active ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                         <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform transform ${camp.active ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </button>
                  </div>

                  <div className="flex gap-2">
                      {editingId === camp.id ? (
                         <button onClick={() => handleUpdate(camp.id)} className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20"><Check size={20} /></button>
                      ) : (
                         <button onClick={() => { setEditingId(camp.id); setEditForm(camp); }} className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:text-primary hover:bg-primary/5"><Edit2 size={20} /></button>
                      )}
                      <button onClick={() => handleDelete(camp.id)} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white"><Trash2 size={20} /></button>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Check, X, Megaphone, ToggleLeft, ToggleRight } from 'lucide-react';

interface Campaign {
  id: number;
  title: string;
  description: string;
  code: string;
  active: boolean;
}

export default function CampaignManager() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', code: '', active: true });
  const [newForm, setNewForm] = useState({ title: '', description: '', code: '', active: true });
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
    if (res.ok) { setNewForm({ title: '', description: '', code: '', active: true }); fetchCampaigns(); }
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
          <input type="text" placeholder="Başlık (Örn: Sevgililer Günü)" value={newForm.title} onChange={(e) => setNewForm({...newForm, title: e.target.value})} className="p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" required />
          <input type="text" placeholder="Açıklama" value={newForm.description} onChange={(e) => setNewForm({...newForm, description: e.target.value})} className="p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" />
          <input type="text" placeholder="İndirim Kodu" value={newForm.code} onChange={(e) => setNewForm({...newForm, code: e.target.value})} className="p-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" />
          <button type="submit" disabled={loading} className="glitter-btn px-6 py-4 rounded-2xl font-black">Kampanya Ekle</button>
        </form>
      </div>

      <div className="grid gap-6">
        {campaigns.map(camp => (
          <div key={camp.id} className={`p-6 bg-white rounded-[32px] border-2 transition-all ${camp.active ? 'border-primary/20 shadow-lg shadow-primary/5' : 'border-gray-100 opacity-60'}`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div className="flex items-center gap-5">
                  <div className={`p-4 rounded-2xl ${camp.active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                     <Megaphone size={24} />
                  </div>
                  {editingId === camp.id ? (
                     <div className="flex flex-col gap-2">
                        <input type="text" value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} className="font-black text-lg p-1 border-b-2 border-primary outline-none" />
                        <input type="text" value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} className="text-sm p-1 border-b outline-none" />
                     </div>
                  ) : (
                     <div>
                        <h4 className="text-xl font-black text-gray-800">{camp.title}</h4>
                        <p className="text-gray-400 font-bold text-sm">{camp.description}</p>
                        {camp.code && <span className="inline-block mt-2 px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-black">KOD: {camp.code}</span>}
                     </div>
                  )}
               </div>
               
               <div className="flex items-center gap-3 w-full md:w-auto">
                  <button onClick={() => toggleActive(camp)} className={`p-3 rounded-2xl transition-all ${camp.active ? 'text-green-500 bg-green-50' : 'text-gray-300 bg-gray-50'}`}>
                     {camp.active ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                  </button>
                  {editingId === camp.id ? (
                     <button onClick={() => handleUpdate(camp.id)} className="p-3 bg-primary text-white rounded-2xl"><Check size={20} /></button>
                  ) : (
                     <button onClick={() => { setEditingId(camp.id); setEditForm(camp); }} className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:text-primary"><Edit2 size={20} /></button>
                  )}
                  <button onClick={() => handleDelete(camp.id)} className="p-3 bg-red-50 text-red-500 rounded-2xl"><Trash2 size={20} /></button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

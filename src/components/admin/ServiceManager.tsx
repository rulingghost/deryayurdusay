'use client';
import { useState, useEffect, useMemo } from 'react';
import { Plus, Trash2, Edit2, Check, X, Clock, Search, Filter, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface Service {
  id: number;
  name: string;
  price: string;
  category: string;
  duration: number;
}

interface ServiceManagerProps {
  services: Service[];
  onRefresh: () => void;
}

export default function ServiceManager({ services, onRefresh }: ServiceManagerProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', category: 'care', duration: 60 });
  const [newServiceForm, setNewServiceForm] = useState({ name: '', price: '', category: 'care', duration: 60 });
  const [loading, setLoading] = useState(false);
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Categories State
  const [categories, setCategories] = useState<any[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/service-categories');
      if (res.ok) {
          const data = await res.json();
          setCategories(data);
          if (data.length > 0 && !newServiceForm.category) {
               setNewServiceForm(prev => ({ ...prev, category: data[0].name }));
          }
      }
    } catch (error) {
      console.error('Failed to fetch categories');
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName) return;
    const res = await fetch('/api/admin/service-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: newCategoryName })
    });
    if (res.ok) {
        setNewCategoryName('');
        setShowAddCategory(false);
        fetchCategories();
        toast.success('Kategori eklendi');
    } else {
        toast.error('Kategori eklenemedi');
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceForm.name || !newServiceForm.price) {
      toast.error('Lütfen gerekli alanları doldurun');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newServiceForm),
      });
      if (res.ok) {
        setNewServiceForm({ name: '', price: '', category: categories[0]?.name || 'care', duration: 60 });
        onRefresh();
        toast.success('Hizmet başarıyla eklendi');
      } else {
        toast.error('Hizmet eklenirken hata oluştu');
      }
    } catch (e) {
      console.error(e);
      toast.error('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...editForm }),
      });
      if (res.ok) {
        setEditingId(null);
        onRefresh();
        toast.success('Hizmet güncellendi');
      }
    } catch (e) {
      console.error(e);
      toast.error('Güncelleme hatası');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        onRefresh();
        toast.success('Hizmet silindi');
      }
    } catch (e) {
      console.error(e);
      toast.error('Silme işlemi başarısız');
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (service: Service) => {
    setEditingId(service.id);
    setEditForm({ 
      name: service.name, 
      price: service.price, 
      category: service.category, 
      duration: service.duration || 60 
    });
  };

  const getCategoryLabel = (name: string) => {
      const cat = categories.find(c => c.name === name);
      return cat ? cat.label : name;
  };

  // Filtered Services
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [services, searchQuery, filterCategory]);

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-gray-300" size={20} />
          <input 
            type="text" 
            placeholder="Hizmet ara..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-none outline-none focus:ring-2 ring-primary/20 transition-all font-bold text-gray-700"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter size={18} className="text-gray-400" />
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-3 bg-gray-50 rounded-xl border-none outline-none font-bold text-gray-600 text-sm w-full md:w-48 capitalize"
          >
            <option value="all">Tüm Kategoriler</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Add New Service */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3 text-primary">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <Sparkles size={24} />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Yeni Hizmet Ekle</h3>
            </div>
            
            {!showAddCategory ? (
                <button onClick={() => setShowAddCategory(true)} className="text-xs text-primary font-black hover:bg-primary/5 px-4 py-2 rounded-xl transition-colors uppercase tracking-widest border border-primary/10">+ Yeni Kategori</button>
            ) : (
                <div className="flex items-center gap-2 animate-fadeIn bg-gray-50 p-2 rounded-2xl border border-gray-100">
                    <input 
                        autoFocus 
                        type="text" 
                        placeholder="Kategori Adı" 
                        value={newCategoryName} 
                        onChange={e => setNewCategoryName(e.target.value)} 
                        className="p-2 bg-white rounded-xl text-sm outline-none w-40 font-bold" 
                    />
                    <button onClick={handleAddCategory} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"><Check size={16} /></button>
                    <button onClick={() => setShowAddCategory(false)} className="p-2 bg-gray-200 text-gray-500 rounded-lg hover:bg-gray-300 transition-colors"><X size={16} /></button>
                </div>
            )}
        </div>

        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-3">Hizmet Adı</label>
             <input
               type="text"
               placeholder="Örn: Nail Art"
               value={newServiceForm.name}
               onChange={(e) => setNewServiceForm({ ...newServiceForm, name: e.target.value })}
               className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 ring-primary/20 transition-all font-bold"
               required
             />
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-3">Fiyat</label>
             <input
               type="text"
               placeholder="Örn: 300₺"
               value={newServiceForm.price}
               onChange={(e) => setNewServiceForm({ ...newServiceForm, price: e.target.value })}
               className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 ring-primary/20 transition-all font-bold"
               required
             />
          </div>

          <div className="space-y-2 relative">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-3">Süre</label>
             <div className="relative">
                <input
                  type="number"
                  placeholder="Dakika"
                  value={newServiceForm.duration}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, duration: parseInt(e.target.value) })}
                  className="w-full p-4 pl-12 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 ring-primary/20 transition-all font-bold"
                  required
                />
                <Clock size={18} className="absolute left-4 top-4 text-gray-400" />
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-3">Kategori</label>
             <select
               value={newServiceForm.category}
               onChange={(e) => setNewServiceForm({ ...newServiceForm, category: e.target.value })}
               className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 ring-primary/20 transition-all font-bold text-gray-700 block appearance-none"
             >
                {categories.length > 0 ? (
                   categories.map(c => <option key={c.id} value={c.name}>{c.label}</option>)
                ) : (
                   <option value="care">Yükleniyor...</option>
                )}
             </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="lg:col-span-4 glitter-btn py-4 rounded-2xl font-black uppercase tracking-widest mt-2 hover:scale-[1.01] active:scale-[0.99] transition-transform"
          >
            Hizmet Oluştur
          </button>
        </form>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-12 gap-4 px-6 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <div className="col-span-4">Hizmet Adı</div>
              <div className="col-span-3">Fiyat</div>
              <div className="col-span-2">Süre</div>
              <div className="col-span-2">Kategori</div>
              <div className="col-span-1 text-right">#</div>
          </div>
          
          {filteredServices.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
                <p className="text-gray-400 font-bold">Aradığınız kriterlere uygun hizmet bulunamadı.</p>
            </div>
          ) : (
            filteredServices.map((service) => (
               <div key={service.id} className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all group">
                   {editingId === service.id ? (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                          <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="p-3 bg-gray-50 rounded-xl font-bold md:col-span-1" />
                          <div className="flex gap-2 md:col-span-3">
                             <input type="text" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} className="p-3 bg-gray-50 rounded-xl font-bold w-full" placeholder="Fiyat" />
                             <input type="number" value={editForm.duration} onChange={(e) => setEditForm({ ...editForm, duration: parseInt(e.target.value) })} className="p-3 bg-gray-50 rounded-xl font-bold w-24" placeholder="Dk" />
                             <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} className="p-3 bg-gray-50 rounded-xl font-bold w-full">
                                {categories.map(c => <option key={c.id} value={c.name}>{c.label}</option>)}
                             </select>
                             <button onClick={() => handleUpdate(service.id)} className="p-3 bg-green-500 text-white rounded-xl"><Check size={18} /></button>
                             <button onClick={() => setEditingId(null)} className="p-3 bg-gray-200 text-gray-600 rounded-xl"><X size={18} /></button>
                          </div>
                      </div>
                   ) : (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          <div className="col-span-4 font-bold text-gray-800 text-lg">{service.name}</div>
                          <div className="col-span-3 font-bold text-primary">{service.price}</div>
                          <div className="col-span-2 flex items-center gap-2 text-gray-500 font-medium">
                              <Clock size={14} /> {service.duration} dk
                          </div>
                          <div className="col-span-2">
                             <span className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-black uppercase text-gray-500 tracking-wider">
                                {getCategoryLabel(service.category)}
                             </span>
                          </div>
                          <div className="col-span-1 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => startEditing(service)} className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"><Edit2 size={18} /></button>
                              <button onClick={() => handleDelete(service.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"><Trash2 size={18} /></button>
                          </div>
                      </div>
                   )}
               </div>
            ))
          )}
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Clock } from 'lucide-react';

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

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newServiceForm),
      });
      if (res.ok) {
        setNewServiceForm({ name: '', price: '', category: 'care', duration: 60 });
        onRefresh();
      }
    } catch (e) {
      console.error(e);
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
      }
    } catch (e) {
      console.error(e);
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
      }
    } catch (e) {
      console.error(e);
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

  return (
    <div className="space-y-8">
      {/* Add New Service */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Plus size={20} />
          </div>
          <h3 className="text-xl font-bold">Yeni Hizmet Ekle</h3>
        </div>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="İşlem Adı"
            value={newServiceForm.name}
            onChange={(e) => setNewServiceForm({ ...newServiceForm, name: e.target.value })}
            className="p-3 rounded-xl border border-gray-200 outline-none focus:border-primary"
            required
          />
          <input
            type="text"
            placeholder="Fiyat (örn: 300₺)"
            value={newServiceForm.price}
            onChange={(e) => setNewServiceForm({ ...newServiceForm, price: e.target.value })}
            className="p-3 rounded-xl border border-gray-200 outline-none focus:border-primary"
            required
          />
          <div className="relative">
            <input
              type="number"
              placeholder="Süre (dk)"
              value={newServiceForm.duration}
              onChange={(e) => setNewServiceForm({ ...newServiceForm, duration: parseInt(e.target.value) })}
              className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-primary pl-10"
              required
            />
            <Clock size={16} className="absolute left-3 top-4 text-gray-400" />
          </div>
          <select
            value={newServiceForm.category}
            onChange={(e) => setNewServiceForm({ ...newServiceForm, category: e.target.value })}
            className="p-3 rounded-xl border border-gray-200 outline-none focus:border-primary"
          >
            <option value="art">Nail Art</option>
            <option value="protez">Protez</option>
            <option value="french">French</option>
            <option value="care">Bakım</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="glitter-btn px-6 py-3 rounded-xl font-bold disabled:opacity-50"
          >
            Ekle
          </button>
        </form>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">İşlem Adı</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Fiyat</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Süre</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Kategori</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-600">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    {editingId === service.id ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full p-2 border rounded-lg focus:border-primary outline-none"
                      />
                    ) : (
                      <span className="font-bold text-gray-800">{service.name}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === service.id ? (
                      <input
                        type="text"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        className="w-full p-2 border rounded-lg focus:border-primary outline-none"
                      />
                    ) : (
                      <span className="text-primary font-bold">{service.price}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === service.id ? (
                      <input
                        type="number"
                        value={editForm.duration}
                        onChange={(e) => setEditForm({ ...editForm, duration: parseInt(e.target.value) })}
                        className="w-full p-2 border rounded-lg focus:border-primary outline-none"
                        title="Dakika cinsinden süre"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={14} className="text-primary" />
                        <span className="text-sm font-medium">{service.duration} dk</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === service.id ? (
                      <select
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="w-full p-2 border rounded-lg focus:border-primary outline-none"
                      >
                        <option value="art">Nail Art</option>
                        <option value="protez">Protez</option>
                        <option value="french">French</option>
                        <option value="care">Bakım</option>
                      </select>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500 uppercase tracking-wider">{service.category}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {editingId === service.id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(service.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-200"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                          >
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(service)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

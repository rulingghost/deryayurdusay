'use client';
import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { compressImage } from '@/lib/utils';

interface GalleryManagerProps {
  gallery: any[];
  onUpload: (file: File, category: string, caption: string) => void;
  onDelete: (id: number) => void;
  uploading: boolean;
}

const categories = [
  { id: 'art', label: 'Nail Art' },
  { id: 'protez', label: 'Protez Tırnak' },
  { id: 'french', label: 'French' },
  { id: 'care', label: 'Bakım' },
];

export default function GalleryManager({ gallery, onUpload, onDelete, uploading }: GalleryManagerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('art');
  const [caption, setCaption] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };



  const handleUpload = async () => {
    if (selectedFile) {
        try {
            const compressedFile = await compressImage(selectedFile);
            onUpload(compressedFile, selectedCategory, caption);
            setSelectedFile(null);
            setPreviewUrl('');
            setCaption('');
        } catch (error) {
            alert('Görsel hazırlanırken bir hata oluştu');
        }
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold mb-6">Yeni Görsel Ekle</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Preview */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center min-h-[300px]">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="max-h-64 rounded-lg" />
            ) : (
              <div className="text-center text-gray-400">
                <ImageIcon size={64} className="mx-auto mb-4" />
                <p>Önizleme</p>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Görsel Seç</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Kategori</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Açıklama</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Örn: Pembe Glitter Tasarım"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="w-full bg-primary text-white p-4 rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Upload size={20} />
              {uploading ? 'Yükleniyor...' : 'Yükle'}
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold mb-6">Mevcut Görseller ({gallery.length})</h2>
        
        {gallery.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <ImageIcon size={64} className="mx-auto mb-4" />
            <p>Henüz görsel eklenmemiş</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((img) => (
              <div key={img.id} className="relative group aspect-square">
                <img
                  src={img.image_url}
                  alt={img.caption}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center p-4">
                  <p className="text-white text-sm text-center mb-2">{img.caption}</p>
                  <span className="text-xs text-white/70 mb-4">{img.category}</span>
                  <button
                    onClick={() => onDelete(img.id)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

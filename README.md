# 💅 Derya Yurdusay Nail Art Studio

Modern, profesyonel tırnak sanatı stüdyosu web sitesi - Next.js 15 ile geliştirildi.

## 🚀 Vercel'e Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rulingghost/deryayurdusay)

### Adım 1: Vercel'de Proje Oluştur
1. [vercel.com](https://vercel.com) → New Project
2. GitHub repo'yu seç: `rulingghost/deryayurdusay`
3. Deploy butonuna tıkla

### Adım 2: Vercel Postgres Ekle
1. Vercel Dashboard → Projen → **Storage** sekmesi
2. **Create Database** → **Postgres**
3. Database adı: `derya-nail-art-db`
4. Region: **Frankfurt**
5. **Create**

### Adım 3: Vercel Blob Ekle (Görsel Yükleme İçin)
1. Vercel Dashboard → Projen → **Storage** sekmesi
2. **Create Database** → **Blob**
3. **Create**

### Adım 4: Environment Variables
Vercel otomatik ekler:
- `POSTGRES_URL` (Postgres'ten)
- `BLOB_READ_WRITE_TOKEN` (Blob'dan)

Manuel ekle:
- `GOOGLE_API_KEY` = `AIzaSyAnnFULh5VjxcJ-LLJqjrXlbqSHifxaf4Q`

### Adım 5: Redeploy
Settings → Environment Variables ekledikten sonra:
- Deployments → Latest → Redeploy

---

## 🔐 Admin Paneli

**URL:** `https://your-site.vercel.app/admin`

- **Kullanıcı Adı:** `gencayınkarısıderya`
- **Şifre:** `gencayıcokseviyor`

### Admin Özellikleri:
- ✅ Randevu yönetimi
- ✅ WhatsApp otomatik açılma (onayda)
- ✅ Galeri yönetimi (yükle/sil)
- ✅ Kategori seçimi

---

## ✨ Özellikler

- 🎨 Modern, responsive tasarım
- 📅 Randevu sistemi
- 🖼️ Admin galeri yönetimi
- 💬 WhatsApp entegrasyonu
- 💰 Fiyat listesi
- ❓ SSS
- ⭐ Müşteri yorumları
- 🗄️ Vercel Postgres veritabanı
- 📦 Vercel Blob görsel depolama

---

## 🛠️ Yerel Geliştirme

```bash
npm install
npm run dev
```

Tarayıcıda: `http://localhost:3000`

**Not:** Yerel geliştirmede görsel yükleme base64 kullanır. Vercel'de Blob kullanılır.

---

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx          # Admin giriş
│   │   └── dashboard/
│   │       └── page.tsx      # Admin panel
│   ├── api/
│   │   ├── appointments/     # Randevu API
│   │   ├── gallery/          # Galeri API
│   │   └── admin/gallery/    # Admin galeri API
│   └── page.tsx              # Ana sayfa
├── components/
│   ├── Gallery.tsx           # Galeri
│   ├── Pricing.tsx           # Fiyat listesi
│   ├── FAQ.tsx               # SSS
│   └── admin/
│       └── GalleryManager.tsx # Admin galeri yönetimi
└── lib/
    └── db.ts                 # Veritabanı fonksiyonları
```

---

## 📞 İletişim

- **Telefon:** +90 554 026 57 67
- **Email:** info@deryayurdusay.com
- **Adres:** Üçtutlar Mah. Osmancık Cd. Fatih 1. Sokak No:1/A, 19000 Merkez/Çorum

---

## 🔧 Teknolojiler

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Vercel Postgres
- Vercel Blob
- Lucide Icons

---

## 📝 Lisans

© 2025 Derya Yurdusay Nail Art Studio | Tüm hakları saklıdır.

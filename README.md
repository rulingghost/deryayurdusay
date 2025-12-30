# 💅 Derya Yurdusay Nail Art Studio

Modern, profesyonel tırnak sanatı stüdyosu web sitesi - Next.js 15 ile geliştirildi.

---

## ✨ Özellikler

### 🎨 Galeri
- **45+ Profesyonel Tırnak Görseli** (Unsplash yüksek kalite)
- Kategori filtreleme: Nail Art, French, Protez, Bakım
- Lightbox görüntüleme
- Favori sistemi (❤️)

### 📅 Randevu Sistemi
- Çok adımlı rezervasyon formu
- Hizmet seçimi, tarih/saat seçimi
- Veritabanında saklanıyor (Vercel Postgres)

### 🔐 Admin Paneli
- **GİRİŞ:** `https://your-site.vercel.app/admin`
- **Kullanıcı Adı:** `gencayınkarısıderya`
- **Şifre:** `gencayıcokseviyor`

#### Admin Panel Özellikleri:
- ✅ Tüm randevuları görüntüleme
- ✅ Randevu onaylama/iptal etme
- ✅ **WhatsApp Otomatik Açılma:** Randevu onaylandığında müşterinin WhatsApp'ı otomatik açılır
- ✅ Filtreleme (Bekleyen, Onaylanan, İptal)
- ✅ Arama (İsim, email, telefon)

### 🤖 Yapay Zeka
- Google Gemini entegrasyonu
- "Tarzını Keşfet" kişiselleştirilmiş test
- Otomatik stil önerileri

### 📱 Diğer
- Tam responsive tasarım
- WhatsApp floating button
- Müşteri yorumları
- Hakkımda bölümü

---

## 🚀 Yerel Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda: `http://localhost:3000`

---

## 🌐 Vercel'e Deploy

**Detaylı rehber:** `VERCEL_DEPLOYMENT.md` dosyasına bak

### Hızlı Başlangıç:

1. **GitHub'a yükle:**
```bash
git init
git add .
git commit -m "Initial commit"
git push
```

2. **Vercel'de proje oluştur:**
   - [vercel.com](https://vercel.com) → New Project
   - GitHub repo'nu seç
   - Deploy

3. **Veritabanı ekle:**
   - Vercel Dashboard → Storage → Create Database → Postgres
   - Otomatik environment variables eklenir

4. **Google API Key ekle:**
   - Settings → Environment Variables
   - `GOOGLE_API_KEY` = `AIzaSyAnnFULh5VjxcJ-LLJqjrXlbqSHifxaf4Q`

5. **Redeploy yap**

---

## 🔑 Environment Variables

Vercel'de şu değişkenleri ekle:

```env
# Google Gemini AI
GOOGLE_API_KEY=AIzaSyAnnFULh5VjxcJ-LLJqjrXlbqSHifxaf4Q

# Vercel Postgres (otomatik eklenir)
POSTGRES_URL=...
```

---

## 🗄️ Veritabanı

Vercel Postgres kullanıyor. Tablolar otomatik oluşturulur:

- `appointments` - Randevu kayıtları
- `gallery` - Galeri görselleri (opsiyonel)

---

## 📋 Admin Paneli Kullanımı

1. **Giriş:** `/admin`
   - Kullanıcı: `gencayınkarısıderya`
   - Şifre: `gencayıcokseviyor`

2. **Randevu Onaylama:**
   - Dashboard'da bekleyen randevuları gör
   - "Onayla" butonuna tıkla
   - **WhatsApp otomatik açılır** hazır mesajla!

3. **Mesaj Şablonu:**
   > Merhaba [İsim], Derya Yurdusay Nail Art randevunuz onaylanmıştır. 🌸
   > Tarih: [Tarih]
   > Saat: [Saat]

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
│   │   └── generate-style/   # AI API
│   └── page.tsx              # Ana sayfa
├── components/
│   ├── Gallery.tsx           # 45 resimli galeri
│   ├── BookingForm.tsx       # Randevu formu
│   ├── StyleQuiz.tsx         # AI testi
│   └── ...
└── lib/
    ├── db.ts                 # Veritabanı fonksiyonları
    └── mockGalleryData.ts    # 45 tırnak görseli
```

---

## 🖼️ Görseller

- **Logo:** `/public/logo.png` ✅
- **İmza:** `/public/imza.png` ✅
- **Galeri:** 45 adet Unsplash görseli
- **Hero Arka Plan:** Unsplash
- **Hakkımda Fotoğraf:** Unsplash

---

## 📞 İletişim Bilgileri

- **Telefon:** +90 554 026 57 67
- **Email:** info@deryayurdusay.com
- **Adres:** Üçtutlar Mah. Osmancık Cd. Fatih 1. Sokak No:1/A, 19000 Merkez/Çorum

---

## 🛠️ Teknolojiler

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Google Gemini AI
- Vercel Postgres
- Lucide Icons

---

## ✅ Özellikler

- [x] 45 profesyonel tırnak görseli
- [x] Kategori filtreleme
- [x] Favori sistemi
- [x] AI destekli stil önerileri
- [x] Çok adımlı randevu formu
- [x] Admin paneli
- [x] WhatsApp entegrasyonu
- [x] Vercel Postgres veritabanı
- [x] Responsive tasarım

---

## 📝 Lisans

© 2025 Derya Yurdusay Nail Art Studio | Tüm hakları saklıdır.

---

## 🆘 Destek

Sorun yaşarsan:
- `VERCEL_DEPLOYMENT.md` dosyasını oku
- Vercel Dashboard → Logs sekmesini kontrol et
- GitHub Issues'a yaz

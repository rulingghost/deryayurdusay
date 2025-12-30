# Vercel Deployment Rehberi

## 📦 Vercel'e Deploy Etme

### 1. Vercel Hesabı Oluştur
- [vercel.com](https://vercel.com) adresine git
- GitHub hesabınla giriş yap

### 2. Projeyi GitHub'a Yükle
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <GITHUB_REPO_URL>
git push -u origin main
```

### 3. Vercel'de Proje Oluştur
1. Vercel Dashboard → "Add New Project"
2. GitHub repo'nu seç
3. Framework Preset: **Next.js** (otomatik algılanır)
4. Root Directory: `./`
5. **Deploy** butonuna tıkla

### 4. Veritabanı Kurulumu (Vercel Postgres)

#### Adım 1: Vercel Postgres Oluştur
1. Vercel Dashboard → Projen → **Storage** sekmesi
2. **Create Database** → **Postgres**
3. Database adı: `derya-nail-art-db`
4. Region: **Frankfurt** (en yakın)
5. **Create** butonuna tıkla

#### Adım 2: Environment Variables Otomatik Eklenir
Vercel Postgres oluşturduğunda şu değişkenler otomatik eklenir:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

#### Adım 3: Google API Key Ekle
1. Vercel Dashboard → Projen → **Settings** → **Environment Variables**
2. Yeni değişken ekle:
   - **Name:** `GOOGLE_API_KEY`
   - **Value:** `AIzaSyAnnFULh5VjxcJ-LLJqjrXlbqSHifxaf4Q`
   - **Environment:** Production, Preview, Development (hepsini seç)
3. **Save** butonuna tıkla

#### Adım 4: Redeploy
1. **Deployments** sekmesine git
2. En son deployment'ın yanındaki **⋯** menüsüne tıkla
3. **Redeploy** seç
4. ✅ Veritabanı bağlantısı artık aktif!

---

## 🗄️ Veritabanı Tabloları

Uygulama ilk çalıştığında otomatik oluşturulur:

### `appointments` Tablosu
```sql
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  service VARCHAR(100) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `gallery` Tablosu
```sql
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Admin Giriş Bilgileri

**URL:** `https://your-domain.vercel.app/admin`

- **Kullanıcı Adı:** `gencayınkarısıderya`
- **Şifre:** `gencayıcokseviyor`

---

## 🌐 Custom Domain (İsteğe Bağlı)

1. Vercel Dashboard → Projen → **Settings** → **Domains**
2. Domain adını ekle (örn: `deryayurdusay.com`)
3. DNS ayarlarını güncelle (Vercel'in verdiği talimatları takip et)

---

## ✅ Deployment Checklist

- [ ] GitHub'a kod yüklendi
- [ ] Vercel'de proje oluşturuldu
- [ ] Vercel Postgres veritabanı oluşturuldu
- [ ] `GOOGLE_API_KEY` environment variable eklendi
- [ ] Redeploy yapıldı
- [ ] Site açılıyor: `https://your-project.vercel.app`
- [ ] Admin paneline giriş yapılabiliyor
- [ ] Randevu oluşturulabiliyor
- [ ] WhatsApp entegrasyonu çalışıyor

---

## 🐛 Sorun Giderme

### "Database connection failed"
- Vercel Postgres oluşturuldu mu?
- Environment variables ekli mi?
- Redeploy yapıldı mı?

### "Admin girişi çalışmıyor"
- Kullanıcı adı: `gencayınkarısıderya` (boşluksuz)
- Şifre: `gencayıcokseviyor` (boşluksuz)

### "Görseller yüklenmiyor"
- Unsplash URL'leri engellenmiş olabilir
- Vercel'in image optimization ayarlarını kontrol et

---

## 📞 Destek

Sorun yaşarsan:
1. Vercel Dashboard → **Logs** sekmesinden hataları kontrol et
2. GitHub Issues'a yaz
3. Vercel Support'a ulaş

---

**Başarılar! 🚀**

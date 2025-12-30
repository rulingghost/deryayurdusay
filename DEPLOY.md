# 🚀 VERCEL DEPLOYMENT - HIZLI BAŞLANGIÇ

## ⚡ 5 Dakikada Deploy Et!

### 1️⃣ GitHub'a Yükle
```bash
git init
git add .
git commit -m "Derya Yurdusay Nail Art Studio - Initial Commit"
git branch -M main
# GitHub'da yeni repo oluştur, sonra:
git remote add origin https://github.com/KULLANICI_ADIN/derya-nail-art.git
git push -u origin main
```

### 2️⃣ Vercel'e Deploy
1. [vercel.com](https://vercel.com) → **New Project**
2. GitHub repo'nu seç
3. **Deploy** butonuna tıkla
4. ✅ Site yayında!

### 3️⃣ Veritabanı Ekle
1. Vercel Dashboard → Projen → **Storage** sekmesi
2. **Create Database** → **Postgres**
3. Database adı: `derya-db`
4. Region: **Frankfurt**
5. **Create**

### 4️⃣ API Key Ekle
1. **Settings** → **Environment Variables**
2. Yeni ekle:
   - Name: `GOOGLE_API_KEY`
   - Value: `AIzaSyAnnFULh5VjxcJ-LLJqjrXlbqSHifxaf4Q`
3. **Save**

### 5️⃣ Redeploy
1. **Deployments** sekmesi
2. En son deployment → **⋯** → **Redeploy**
3. ✅ Veritabanı bağlandı!

---

## 🔐 Admin Bilgileri

**URL:** `https://your-site.vercel.app/admin`

- Kullanıcı: `gencayınkarısıderya`
- Şifre: `gencayıcokseviyor`

---

## ✅ Kontrol Listesi

- [ ] GitHub'a kod yüklendi
- [ ] Vercel'de deploy edildi
- [ ] Vercel Postgres oluşturuldu
- [ ] GOOGLE_API_KEY eklendi
- [ ] Redeploy yapıldı
- [ ] Site açılıyor
- [ ] Admin girişi çalışıyor
- [ ] Randevu oluşturulabiliyor
- [ ] WhatsApp açılıyor

---

## 🐛 Sorun mu var?

### Site açılmıyor
- Vercel Dashboard → **Logs** kontrol et
- Build hatası varsa düzelt, tekrar push et

### Admin girişi çalışmıyor
- Kullanıcı adını TAM yaz: `gencayınkarısıderya`
- Şifreyi TAM yaz: `gencayıcokseviyor`
- Boşluk olmamalı!

### Randevular kaydedilmiyor
- Vercel Postgres oluşturuldu mu?
- Environment variables var mı?
- Redeploy yapıldı mı?

---

## 📞 İletişim

Sorun yaşarsan `VERCEL_DEPLOYMENT.md` dosyasını oku!

**Başarılar! 🎉**

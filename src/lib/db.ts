import { sql } from "@vercel/postgres";

// Mock storage for local development
let mockAppointments: any[] = [];
let mockGallery: any[] = [];
let mockCampaigns: any[] = [
  { id: 1, title: 'Yeni Yıl İndirimi', description: 'Tüm nail art işlemlerinde %20 indirim!', code: 'YENIYIL20', discount_percent: 20, start_date: '2025-01-01', end_date: '2025-01-31', image_url: '', active: true },
];
let mockPosts: any[] = [
  { 
    id: 1, 
    slug: 'protez-tirnak-bakimi', 
    title: 'Protez Tırnak Sonrası Bakım Nasıl Yapılır?', 
    excerpt: 'Protez tırnaklarınızın ömrünü uzatmak ve tırnak sağlığınızı korumak için bilmeniz gerekenler.', 
    content: 'Protez tırnaklar hem zarif bir görünüm sunar hem de tırnak yeme alışkanlığı olanlar için harika bir çözümdür. Ancak bu güzelliği korumak için bazı kurallara dikkat etmelisiniz.\n\nİlk 24 saat su ile yoğun temastan kaçının. Tırnak etlerinize düzenli olarak bakım yağı uygulamak, malzemenin esnekliğini korur. Ev işi yaparken mutlaka eldiven kullanın, çünkü temizlik malzemelerindeki kimyasallar jelin yapısını bozabilir. Asla tırnaklarınızı bir alet gibi kullanıp zorlamayın.\n\nEn önemlisi, randevularınızı aksatmayın. 3-4 haftalık periyotlarla yapılan bakımlar, doğal tırnağınızın sağlığını korumak için kritiktir.', 
    image_url: 'https://images.unsplash.com/photo-1629193512341-ced08465492d',
    created_at: new Date().toISOString()
  },
  { 
    id: 2, 
    slug: 'kalici-oje-rehberi', 
    title: 'Kalıcı Oje Ömrünü Uzatmanın 5 Altın Kuralı', 
    excerpt: 'Kalıcı ojenizin ilk günkü parlaklığını haftalarca koruması için dikkat etmeniz gereken ipuçları.', 
    content: 'Kalıcı oje, modern kadının zamanını kurtaran en büyük buluşlardan biri. Peki ama neden bazılarında 1 hafta, bazılarında 3 hafta kusursuz kalıyor?\n\n1. Sıcak Su Etkisi: Uygulamadan sonraki ilk birkaç saat çok sıcak banyo veya saunadan kaçının.\n2. Kimyasal Teması: Bulaşık deterjanı ve çamaşır suyu en büyük düşmandır. Eldiven dostunuz olsun.\n3. Tırnak Uçları: Ojenizi uçlardan kazımaya çalışmayın, bu hava almasına ve soyulmasına neden olur.\n4. Nemlendirme: Tırnak etlerini nemli tutmak, ojenin kenarlardan kalkmasını engeller.\n5. Profesyonel Uygulama: Doğru törpüleme ve baz uygulaması ömrü %50 artırır.', 
    image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371',
    created_at: new Date().toISOString()
  },
  { 
    id: 3, 
    slug: '2024-nail-art-trendleri', 
    title: '2024 Nail Art Trendleri: Zerafet ve Minimalizm', 
    excerpt: 'Bu yıl tırnaklarda hangi renkler ve desenler ön planda? İşte sezonun en popüler tasarımları.', 
    content: 'Nail art dünyası her geçen gün daha da sadeleşiyor. Bu yıl "Chrome" tırnaklar ve "Micro-French" stili zirvede. Klasik beyaz French yerine çok ince çizgili neon veya pastel tonlar tercih ediliyor.\n\n"Quiet Luxury" akımı tırnaklara da yansıdı; çıplak tırnak üzerine minik taşlar veya tek bir nokta koymak oldukça popüler. Ayrıca mermer desenlerin daha soft geçişli versiyonları da sıkça karşımıza çıkacak.\n\nStüdyomuzda bu trendleri sizin tarzınıza nasıl uyarlayabileceğimizi konuşmak için kahveye bekleriz!', 
    image_url: 'https://images.unsplash.com/photo-1632345033839-21c88556a9a0',
    created_at: new Date().toISOString()
  }
];
let mockBeforeAfter: any[] = [
  { 
    id: 1, 
    title: 'Tırnak Rekonstrüksiyonu', 
    before_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371', 
    after_url: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66' 
  }
];
let mockServices: any[] = [
  { id: 1, name: 'Nail Art Tasarımı', price: '400₺ - 800₺', category: 'art', duration: 60 },
  { id: 2, name: 'Protez Tırnak (Gel)', price: '600₺', category: 'protez', duration: 90 },
  { id: 3, name: 'French Manikür', price: '500₺', category: 'french', duration: 45 },
  { id: 4, name: 'Kalıcı Oje', price: '300₺', category: 'care', duration: 40 },
  { id: 5, name: 'Tırnak Bakımı', price: '250₺', category: 'care', duration: 30 },
];

const isLocal = !process.env.POSTGRES_URL;

export async function createTable() {
  if (isLocal) return;
  try {
    // Services table
    await sql`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price VARCHAR(100) NOT NULL,
        category VARCHAR(50) DEFAULT 'care',
        duration INTEGER DEFAULT 60,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Appointments table
    await sql`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        service_id INTEGER,
        service_name TEXT,
        appointment_date VARCHAR(50) NOT NULL,
        appointment_time VARCHAR(20) NOT NULL,
        duration INTEGER DEFAULT 60,
        status VARCHAR(20) DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Gallery table
    await sql`
      CREATE TABLE IF NOT EXISTS gallery (
        id SERIAL PRIMARY KEY,
        image_url TEXT NOT NULL,
        caption VARCHAR(255),
        category VARCHAR(50) DEFAULT 'art',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Campaigns table
    await sql`
      CREATE TABLE IF NOT EXISTS campaigns (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        code VARCHAR(50),
        discount_percent INTEGER DEFAULT 0,
        start_date VARCHAR(50),
        end_date VARCHAR(50),
        image_url TEXT,
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Blog Posts table
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Before After table
    await sql`
      CREATE TABLE IF NOT EXISTS before_after (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        before_url TEXT NOT NULL,
        after_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Templates table
    await sql`
      CREATE TABLE IF NOT EXISTS templates (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (e) {
    console.warn("Database connection failed, using mock mode.", e);
  }
}

// Service Functions
export async function getServices() {
  if (isLocal) return mockServices;
  try {
    const { rows } = await sql`SELECT * FROM services ORDER BY category, name;`;
    if (rows.length === 0) return mockServices;
    return rows;
  } catch (e) {
    return mockServices;
  }
}

export async function addService(name: string, price: string, category: string, duration: number) {
  if (isLocal) {
    const newItem = { id: Date.now(), name, price, category, duration };
    mockServices.push(newItem);
    return newItem;
  }
  return await sql`
    INSERT INTO services (name, price, category, duration)
    VALUES (${name}, ${price}, ${category}, ${duration})
    RETURNING id;
  `;
}

export async function updateService(id: number, name: string, price: string, category: string, duration: number) {
  if (isLocal) {
    const item = mockServices.find(s => s.id === id);
    if (item) {
      item.name = name;
      item.price = price;
      item.category = category;
      item.duration = duration;
    }
    return item;
  }
  return await sql`
    UPDATE services 
    SET name = ${name}, price = ${price}, category = ${category}, duration = ${duration}
    WHERE id = ${id}
    RETURNING *;
  `;
}

export async function deleteService(id: number) {
  if (isLocal) {
    mockServices = mockServices.filter(s => s.id !== id);
    return;
  }
  return await sql`DELETE FROM services WHERE id = ${id};`;
}

// Appointments Functions
export async function addAppointment(data: {
  name: string;
  email: string;
  phone: string;
  service_id: number;
  service_name: string;
  date: string;
  time: string;
  duration: number;
  notes?: string;
}) {
  if (isLocal) {
    const newItem = { 
      id: Date.now(), 
      customer_name: data.name, 
      email: data.email, 
      phone: data.phone, 
      service_id: data.service_id,
      service_name: data.service_name,
      appointment_date: data.date, 
      appointment_time: data.time, 
      duration: data.duration,
      status: 'pending',
      notes: data.notes,
      created_at: new Date().toISOString()
    };
    mockAppointments.push(newItem);
    return newItem;
  }
  return await sql`
    INSERT INTO appointments (customer_name, email, phone, service_id, service_name, appointment_date, appointment_time, duration, notes)
    VALUES (${data.name}, ${data.email}, ${data.phone}, ${data.service_id}, ${data.service_name}, ${data.date}, ${data.time}, ${data.duration}, ${data.notes})
    RETURNING id;
  `;
}

export async function getAppointments(date?: string) {
  if (isLocal) {
    if (date) return mockAppointments.filter(app => app.appointment_date === date);
    return mockAppointments;
  }
  try {
    if (date) {
      const { rows } = await sql`SELECT * FROM appointments WHERE appointment_date = ${date} ORDER BY appointment_time ASC;`;
      return rows;
    }
    const { rows } = await sql`SELECT * FROM appointments ORDER BY appointment_date DESC, appointment_time ASC;`;
    return rows;
  } catch (e) {
    return mockAppointments;
  }
}

export async function updateAppointmentStatus(id: number, status: string) {
  if (isLocal) {
    const item = mockAppointments.find(app => app.id === id);
    if (item) item.status = status;
    return item;
  }
  return await sql`
    UPDATE appointments SET status = ${status} WHERE id = ${id} RETURNING *;
  `;
}

// Gallery Functions
export async function addGalleryImage(url: string, caption: string, category: string = 'art') {
  if (isLocal) {
    const newItem = { id: Date.now(), image_url: url, caption, category, created_at: new Date().toISOString() };
    mockGallery.push(newItem);
    return newItem;
  }
  return await sql`
    INSERT INTO gallery (image_url, caption, category)
    VALUES (${url}, ${caption}, ${category})
    RETURNING id;
  `;
}

export async function getGalleryImages() {
  if (isLocal) return mockGallery;
  try {
    const { rows } = await sql`SELECT * FROM gallery ORDER BY created_at DESC;`;
    return rows;
  } catch (e) {
    return mockGallery;
  }
}

export async function deleteGalleryImage(id: number) {
  if (isLocal) {
    mockGallery = mockGallery.filter(item => item.id !== id);
    return;
  }
  return await sql`DELETE FROM gallery WHERE id = ${id};`;
}

// Campaign Functions
export async function getCampaigns() {
  if (isLocal) return mockCampaigns;
  try {
    const { rows } = await sql`SELECT * FROM campaigns ORDER BY created_at DESC;`;
    return rows;
  } catch (e) {
    return mockCampaigns;
  }
}

export async function addCampaign(title: string, description: string, code: string, percent: number, start: string, end: string, image_url: string = '', active: boolean = true) {
  if (isLocal) {
    const newItem = { id: Date.now(), title, description, code, discount_percent: percent, start_date: start, end_date: end, image_url, active, created_at: new Date().toISOString() };
    mockCampaigns.push(newItem);
    return newItem;
  }
  return await sql`
    INSERT INTO campaigns (title, description, code, discount_percent, start_date, end_date, image_url, active)
    VALUES (${title}, ${description}, ${code}, ${percent}, ${start}, ${end}, ${image_url}, ${active})
    RETURNING id;
  `;
}

export async function updateCampaign(id: number, title: string, description: string, code: string, percent: number, start: string, end: string, active: boolean) {
  if (isLocal) {
    const item = mockCampaigns.find(c => c.id === id);
    if (item) {
      item.title = title;
      item.description = description;
      item.code = code;
      item.discount_percent = percent;
      item.start_date = start;
      item.end_date = end;
      item.active = active;
    }
    return item;
  }
  return await sql`
    UPDATE campaigns 
    SET title = ${title}, description = ${description}, code = ${code}, discount_percent = ${percent}, start_date = ${start}, end_date = ${end}, active = ${active}
    WHERE id = ${id}
    RETURNING *;
  `;
}

export async function deleteCampaign(id: number) {
  if (isLocal) {
    mockCampaigns = mockCampaigns.filter(c => c.id !== id);
    return;
  }
  return await sql`DELETE FROM campaigns WHERE id = ${id};`;
}

// Blog Functions
export async function getPosts() {
  if (isLocal) return mockPosts;
  try {
    const { rows } = await sql`SELECT * FROM posts ORDER BY created_at DESC;`;
    return rows;
  } catch (e) {
    return mockPosts;
  }
}

export async function getPostBySlug(slug: string) {
  if (isLocal) return mockPosts.find(p => p.slug === slug);
  try {
    const { rows } = await sql`SELECT * FROM posts WHERE slug = ${slug};`;
    return rows[0];
  } catch (e) {
    return mockPosts.find(p => p.slug === slug);
  }
}

export async function addPost(data: { slug: string, title: string, excerpt: string, content: string, image_url: string }) {
  if (isLocal) {
    const newItem = { id: Date.now(), ...data, created_at: new Date().toISOString() };
    mockPosts.push(newItem);
    return newItem;
  }
  return await sql`
    INSERT INTO posts (slug, title, excerpt, content, image_url)
    VALUES (${data.slug}, ${data.title}, ${data.excerpt}, ${data.content}, ${data.image_url})
    RETURNING id;
  `;
}

export async function deletePost(id: number) {
  if (isLocal) {
    mockPosts = mockPosts.filter(p => p.id !== id);
    return;
  }
  return await sql`DELETE FROM posts WHERE id = ${id};`;
}

// Before After Functions
export async function getBeforeAfter() {
  if (isLocal) return mockBeforeAfter;
  try {
    const { rows } = await sql`SELECT * FROM before_after ORDER BY created_at DESC;`;
    return rows;
  } catch (e) {
    return mockBeforeAfter;
  }
}

export async function addBeforeAfter(title: string, before_url: string, after_url: string) {
  if (isLocal) {
    const newItem = { id: Date.now(), title, before_url, after_url };
    mockBeforeAfter.push(newItem);
    return newItem;
  }
  return await sql`
    INSERT INTO before_after (title, before_url, after_url)
    VALUES (${title}, ${before_url}, ${after_url})
    RETURNING id;
  `;
}

export async function deleteBeforeAfter(id: number) {
  if (isLocal) {
    mockBeforeAfter = mockBeforeAfter.filter(i => i.id !== id);
    return;
  }
  return await sql`DELETE FROM before_after WHERE id = ${id};`;
}

// Template Functions
let mockTemplates: any[] = [
  { id: 1, name: 'Standart Onay', content: 'Merhaba {name}, Derya Yurdusay Nail Art randevunuz onaylanmıştır. 🌸\n📅 Tarih: {date}\n⏰ Saat: {time}\nBekleriz!' },
  { id: 2, name: 'Hazırlık Notu', content: 'Selam {name}! Yarınki randevun için sabırsızlanıyoruz. ✨\nRica etsek gelmeden önce tırnaklarındaki ojeleri temizlemiş olabilir misin? Bu sayede tasarımına daha çok vakit ayırabiliriz.💅\nSaatimiz: {time}' },
  { id: 3, name: 'Konum', content: 'Merhaba {name}, stüdyomuz için konum bilgisi:\n📍 Üçtutlar Mah. Osmancık Cd. Fatih 1. Sokak No:1/A (Çorum Merkez)\nGoogle Haritalar: https://maps.app.goo.gl/xxxx\nSaatimiz: {time} görüşmek üzere! 🌸' }
];

export async function getTemplates() {
  if (isLocal) return mockTemplates;
  try {
    const { rows } = await sql`SELECT * FROM templates ORDER BY id ASC;`;
    return rows;
  } catch (e) {
    return mockTemplates;
  }
}

export async function addTemplate(name: string, content: string) {
  if (isLocal) {
    const newItem = { id: Date.now(), name, content };
    mockTemplates.push(newItem);
    return newItem;
  }
  return await sql`
    INSERT INTO templates (name, content)
    VALUES (${name}, ${content})
    RETURNING id;
  `;
}

export async function updateTemplate(id: number, name: string, content: string) {
  if (isLocal) {
    const item = mockTemplates.find(t => t.id === id);
    if (item) {
      item.name = name;
      item.content = content;
    }
    return item;
  }
  return await sql`
    UPDATE templates SET name = ${name}, content = ${content} WHERE id = ${id} RETURNING *;
  `;
}

export async function deleteTemplate(id: number) {
  if (isLocal) {
    mockTemplates = mockTemplates.filter(t => t.id !== id);
    return;
  }
  return await sql`DELETE FROM templates WHERE id = ${id};`;
}

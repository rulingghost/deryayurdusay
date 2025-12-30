import { sql } from "@vercel/postgres";

// Mock storage for local development
let mockAppointments: any[] = [];
let mockGallery: any[] = [];
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

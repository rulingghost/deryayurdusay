import { sql } from "@vercel/postgres";

// Mock storage for local development
let mockAppointments: any[] = [];
let mockGallery: any[] = [
  { id: 1, image_url: '/nail1.png', caption: 'Glitter Pink' },
  { id: 2, image_url: '/nail2.png', caption: 'Gold Minimalist' },
  { id: 3, image_url: '/hero.png', caption: 'Studio' }
];

const isLocal = !process.env.POSTGRES_URL;

export async function createTable() {
  if (isLocal) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS appointments (
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
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS gallery (
        id SERIAL PRIMARY KEY,
        image_url TEXT NOT NULL,
        caption VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (e) {
    console.warn("Database connection failed, using mock mode.", e);
  }
}

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

export async function addAppointment(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}) {
  if (isLocal) {
    const newItem = { 
      id: Date.now(), 
      customer_name: data.name, 
      email: data.email, 
      phone: data.phone, 
      service: data.service, 
      appointment_date: data.date, 
      appointment_time: data.time, 
      status: 'pending',
      created_at: new Date().toISOString()
    };
    mockAppointments.push(newItem);
    return newItem;
  }
  return await sql`
    INSERT INTO appointments (customer_name, email, phone, service, appointment_date, appointment_time)
    VALUES (${data.name}, ${data.email}, ${data.phone}, ${data.service}, ${data.date}, ${data.time})
    RETURNING id;
  `;
}

export async function getAppointments() {
  if (isLocal) return mockAppointments;
  try {
    const { rows } = await sql`SELECT * FROM appointments ORDER BY created_at DESC;`;
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
    UPDATE appointments
    SET status = ${status}
    WHERE id = ${id}
    RETURNING *;
  `;
}

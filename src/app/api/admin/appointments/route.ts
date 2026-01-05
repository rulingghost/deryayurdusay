import { NextResponse } from 'next/server';
import { getAppointments, createTable, updateAppointmentStatus } from '@/lib/db';
import { sendConfirmationEmail } from '@/lib/mail';

export async function GET() {
  try {
    await createTable();
    const apps = await getAppointments();
    return NextResponse.json(apps);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, date, time, duration } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // CONFLICT CHECK IF RESCHEDULING
    if (date && time) {
        const existingApps = await getAppointments(date);
        
        const proposedStart = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
        const proposedEnd = proposedStart + (duration || 60);

        const hasConflict = existingApps.some(app => {
            if (app.status === 'cancelled' || app.status === 'rejected') return false;
            if (app.id === id) return false; // Don't conflict with self
            
            const [h, m] = app.appointment_time.split(':').map(Number);
            const start = h * 60 + m;
            const end = start + (app.duration || 60);
            
            return (proposedStart < end && proposedEnd > start);
        });

        if (hasConflict) {
            return NextResponse.json({ error: 'Seçilen saat dolu.' }, { status: 409 });
        }
    }

    const updated: any = await updateAppointmentStatus(id, status, date, time, duration);
    
    // Notify customer if email exists
    if (updated && updated.email) {
      try {
        await sendConfirmationEmail(
          updated.email, 
          updated.customer_name, 
          updated.appointment_date, 
          updated.appointment_time,
          status || updated.status
        );
      } catch (e) {
        console.error('Email send failed:', e);
      }
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

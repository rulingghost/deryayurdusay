import { NextResponse } from 'next/server';
import { addAppointment, createTable } from '@/lib/db';
import { getAppointments } from '@/lib/db';
import { sendAdminNotification } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    await createTable();
    const body = await request.json();
    
    // Conflict Check
    const { date, time, duration, name, phone, service_name, notes } = body;
    if (date && time) {
        const existingApps = await getAppointments(date);
        
        const proposedStart = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
        const proposedEnd = proposedStart + (duration || 60);

        const hasConflict = existingApps.some(app => {
            if (app.status === 'cancelled' || app.status === 'rejected') return false;
            
            const [h, m] = app.appointment_time.split(':').map(Number);
            const start = h * 60 + m;
            const end = start + (app.duration || 60);
            
            return (proposedStart < end && proposedEnd > start);
        });

        if (hasConflict) {
            return NextResponse.json({ error: 'Selected time slot is no longer available.' }, { status: 409 });
        }
    }

    await addAppointment(body);

    // Send Admin Notification
    try {
      await sendAdminNotification({
        customerName: name,
        phone: phone,
        service: service_name,
        date: date,
        time: time,
        notes: notes
      });
    } catch (mailError) {
      console.error('Admin notification email failed:', mailError);
    }

    return NextResponse.json({ message: 'Success' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

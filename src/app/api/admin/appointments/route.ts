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
    const { id, status } = body;
    
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updated: any = await updateAppointmentStatus(id, status);
    
    // Notify customer if email exists
    if (updated && updated.email) {
      try {
        await sendConfirmationEmail(
          updated.email, 
          updated.customer_name, 
          updated.appointment_date, 
          updated.appointment_time,
          status
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

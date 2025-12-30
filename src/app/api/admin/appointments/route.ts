import { NextResponse } from 'next/server';
import { getAppointments, createTable, updateAppointmentStatus } from '@/lib/db';

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

    const updated = await updateAppointmentStatus(id, status);
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

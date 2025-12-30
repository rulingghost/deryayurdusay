import { NextResponse } from 'next/server';
import { addAppointment, createTable } from '@/lib/db';

export async function POST(request: Request) {
  try {
    await createTable();
    const body = await request.json();
    await addAppointment(body);
    return NextResponse.json({ message: 'Success' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

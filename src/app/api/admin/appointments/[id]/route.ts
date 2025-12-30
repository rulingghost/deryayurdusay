import { NextResponse } from 'next/server';
import { updateAppointmentStatus } from '@/lib/db';
import { sendConfirmationEmail } from '@/lib/mail';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, email, name, date, time } = body;

    const result = await updateAppointmentStatus(parseInt(id), status);

    if (status === 'confirmed') {
      try {
        await sendConfirmationEmail(email, name, date, time);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // We still return success for the DB update
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

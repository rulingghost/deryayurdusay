import { NextRequest, NextResponse } from 'next/server';
import { getAppointments, getServices } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const serviceId = searchParams.get('serviceId');

  if (!date || !serviceId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const [appointments, services] = await Promise.all([
      getAppointments(date),
      getServices()
    ]);

    const service = services.find(s => s.id === parseInt(serviceId));
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

    const serviceDuration = service.duration || 60;
    
    // Define working hours (09:00 - 19:00)
    const startTime = 9; // 09:00
    const endTime = 19;   // 19:00
    const step = 30;      // Check every 30 mins

    const slots: string[] = [];
    for (let hour = startTime; hour < endTime; hour++) {
      for (let min = 0; min < 60; min += step) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        
        // Calculate end time for proposed slot
        const proposedStart = hour * 60 + min;
        const proposedEnd = proposedStart + serviceDuration;

        // Check for overlap with existing appointments
        const isConflict = appointments.some(app => {
          if (app.status === 'cancelled') return false;
          
          const [appHour, appMin] = app.appointment_time.split(':').map(Number);
          const appStart = appHour * 60 + appMin;
          const appEnd = appStart + (app.duration || 60);

          // Overlap check
          return (proposedStart < appEnd && proposedEnd > appStart);
        });

        // Ensure slot ends before working hours end
        if (!isConflict && proposedEnd <= (endTime * 60)) {
          slots.push(timeStr);
        }
      }
    }

    return NextResponse.json(slots);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

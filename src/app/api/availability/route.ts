import { NextRequest, NextResponse } from 'next/server';
import { getAppointments, getServices, getSettings } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const serviceId = searchParams.get('serviceId');

  if (!date || !serviceId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const [appointments, services, settings] = await Promise.all([
      getAppointments(date),
      getServices(),
      getSettings()
    ]);

    const service = services.find(s => s.id === parseInt(serviceId));
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

    const serviceDuration = service.duration || 60;
    const bufferTime = 0; // Removed buffer time per user request
    
    // Check for holidays from settings
    const d = new Date(date);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
    if (settings.holiday_days.includes(dayName)) {
      return NextResponse.json([]);
    }
    
    // Define working hours from settings
    const [startHour, startMin] = settings.working_hours.start.split(':').map(Number);
    const [endHour, endMin] = settings.working_hours.end.split(':').map(Number);
    
    const startTimeInMinutes = startHour * 60 + startMin;
    const endTimeInMinutes = endHour * 60 + endMin;
    const step = 30;      

    const now = new Date();
    const isToday = date === now.toISOString().split('T')[0];
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const slots: string[] = [];
    for (let currentMinutesLoop = startTimeInMinutes; currentMinutesLoop <= endTimeInMinutes; currentMinutesLoop += step) {
        const hour = Math.floor(currentMinutesLoop / 60);
        const min = currentMinutesLoop % 60;
        const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        
        const proposedStart = currentMinutesLoop;
        const proposedEnd = proposedStart + serviceDuration;

        // 1. Skip if time is in the past (only for today)
        if (isToday && proposedStart <= currentMinutes + 30) continue; 

        // 2. Check for overlap with existing appointments
        const isConflict = appointments.some(app => {
          if (app.status === 'cancelled' || app.status === 'rejected') return false;
          
          const [appHour, appMin] = app.appointment_time.split(':').map(Number);
          const appStart = appHour * 60 + appMin;
          const appEnd = appStart + (app.duration || 60);

          return (proposedStart < appEnd && proposedEnd > appStart);
        });

        if (!isConflict) {
          slots.push(timeStr);
        }
    }

    return NextResponse.json(slots);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

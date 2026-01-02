import { NextRequest, NextResponse } from 'next/server';
import { getCampaigns, addCampaign, updateCampaign, createTable } from '@/lib/db';

export async function GET() {
  try {
    const campaigns = await getCampaigns();
    return NextResponse.json(campaigns);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Campaign POST Body:', body); // Debug log

    const { title, description, code, discount_percent, start_date, end_date, image_url, active } = body;

    if (!title) {
        return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    await createTable(); // Ensure schema is up to date

    const result = await addCampaign(
        title, 
        description || '', 
        code || '', 
        discount_percent || 0, 
        start_date || '', 
        end_date || '', 
        image_url || '', 
        active ?? true
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error('Campaign Add Error:', error);
    return NextResponse.json({ error: 'Failed to add campaign', details: (error as any).message || String(error) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, description, code, discount_percent, start_date, end_date, active } = await req.json();
    const result = await updateCampaign(id, title, description, code, discount_percent || 0, start_date || '', end_date || '', active);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 });
  }
}

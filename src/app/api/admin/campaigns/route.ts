import { NextRequest, NextResponse } from 'next/server';
import { getCampaigns, addCampaign, updateCampaign } from '@/lib/db';

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
    const { title, description, code, discount_percent, start_date, end_date, image_url, active } = await req.json();
    const result = await addCampaign(title, description, code, discount_percent || 0, start_date || '', end_date || '', image_url, active);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add campaign' }, { status: 500 });
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

import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(req: Request) {
  const data = await req.json();
  const doc = {
    _type: 'contactMessage',
    ...data,
    createdAt: new Date().toISOString(),
  };
  await client.create(doc);
  return NextResponse.json({ success: true });
} 
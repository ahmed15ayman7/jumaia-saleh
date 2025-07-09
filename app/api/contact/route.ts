import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(req: Request) {
  const data = await req.json();
  const doc = {
    _type: 'contactMessage',
    ...data,
    createdAt: new Date().toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
  };
  await client.create(doc);
  return NextResponse.json({ success: true });
} 
"use server";
import fs from 'fs';
import path from 'path';

export async function updateMessage({ key, value, locale }: { key: string; value: string; locale: 'ar' | 'en' }) {
    try {
  const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
  const fileContent = await fs.promises.readFile(filePath, 'utf-8');
  const messages = JSON.parse(fileContent);

  // دعم المفاتيح المتداخلة مثل home.hero
  const keys = key.split('.');
  let obj = messages;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!obj[keys[i]]) obj[keys[i]] = {};
    obj = obj[keys[i]];
  }
  obj[keys[keys.length - 1]] = value;

  await fs.promises.writeFile(filePath, JSON.stringify(messages, null, 2), 'utf-8');
  return true;
  } catch (error) {
    console.error(error);
    return false;
  }
} 




import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'cd8rkmlu', // غيّره لو عندك مشروع تاني
  dataset: 'production',
  apiVersion: '2023-07-01',
  token: process.env.SANITY_API_TOKEN, // خلي التوكين في .env لو حابب
  useCdn: false,
});

export async function deleteAllContactMessages() {
  try {
    const messages = await client.fetch(`*[_type == "contact"]{_id}`);
    
    if (!messages.length) {
      console.log('✅ No contact messages found.');
      return;
    }

    console.log(`🗑 Found ${messages.length} messages. Deleting...`);

    for (const msg of messages) {
      await client.delete(msg._id);
      console.log(`✔ Deleted: ${msg._id}`);
    }

    console.log('✅ All contact messages deleted!');
  } catch (err) {
    console.error('❌ Error deleting messages:', err);
  }
}

// deleteAllContactMessages();

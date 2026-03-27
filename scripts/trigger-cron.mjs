// This script simulates the cron call to the LOCAL server
// Reads CRON_SECRET from .env.local
import { readFileSync } from 'fs';

function getCronSecret() {
  try {
    const env = readFileSync('.env.local', 'utf-8');
    const match = env.match(/^CRON_SECRET=(.+)$/m);
    return match ? match[1].trim() : '';
  } catch {
    console.error('Could not read .env.local');
    return '';
  }
}

async function triggerCron() {
  const secret = getCronSecret();
  if (!secret) {
    console.error('CRON_SECRET not found in .env.local');
    return;
  }
  const url = `http://localhost:3000/api/cron/publish?key=${secret}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log('Cron Result:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Cron Error:', err.message);
  }
}
triggerCron();


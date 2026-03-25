// This script simulates the cron call to the LOCAL server
async function triggerCron() {
  const url = `http://localhost:3000/api/cron/publish?key=sukientoanquoc-cron-2026`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log('Cron Result:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Cron Error:', err.message);
  }
}
triggerCron();

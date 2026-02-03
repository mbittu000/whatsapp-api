import { Hono } from 'hono'
import { Client, LocalAuth } from 'whatsapp-web.js';

const app = new Hono()
let client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu',
    ],
  },
})

// states
let qrCode: string | null = null;
let isReady = false;

client.on('qr', (qr) => {
  qrCode = qr;
  console.log("qr", qr, "\n")
})

client.on('ready', () => {
  isReady = true;
  console.log("ready")
})

client.initialize();

app.get('/', (c) => {
  return c.text('server is running')
})

app.get('/qr', (c) => {
  if (isReady) {
    return c.text('ready')
  }
  return c.text(qrCode || 'no qr code')
})

app.get('/ready', (c) => {
  if (isReady) {
    return c.text('ready')
  }
  return c.text('not ready')
})

app.post('/send', async (c) => {
  if (!isReady) {
    return c.text('not ready')
  }
  const { number, message } = await c.req.json();
  if (!number || !message) {
    return c.text('missing number or message')
  }
  await client.sendMessage(`91${number}@c.us`, message)
  return c.text('message sent')
})

app.get('/logout', async (c) => {
  if (!isReady) {
    return c.text('not ready')
  }
  await client.logout()
  return c.text('logged out')
})

app.get('/restart', async (c) => {
  if (!isReady) {
    return c.text('not ready')
  }
  await client.logout()
  await client.initialize()
  return c.text('restarted')
})

app.get("/meta", async (c) => {
  if (!isReady) {
    return c.text('not ready')
  }
  const meta = client.info
  return c.json(meta)
})
export default app

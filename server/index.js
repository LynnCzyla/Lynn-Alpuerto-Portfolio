import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const {
  BREVO_API_KEY,
  SENDER_EMAIL, // must be a sender you verified in Brevo
  SENDER_NAME = 'Portfolio Contact',
  CONTACT_TO, // your inbox: where the messages arrive
  CLIENT_ORIGIN, // only needed if the frontend is hosted on a different domain
  PORT = 3001,
} = process.env

const app = express()
app.set('trust proxy', 1)
app.use(express.json({ limit: '10kb' }))
if (CLIENT_ORIGIN) app.use(cors({ origin: CLIENT_ORIGIN.split(',').map((s) => s.trim()) }))

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5, // 5 messages per IP per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Please try again in a few minutes.' },
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.post('/api/contact', limiter, async (req, res) => {
  const { name = '', email = '', message = '', website = '' } = req.body || {}

  // Honeypot: real people never fill this hidden field. Pretend success for bots.
  if (website) return res.json({ ok: true })

  const cleanName = String(name).trim()
  const cleanEmail = String(email).trim()
  const cleanMessage = String(message).trim()

  if (!cleanName || cleanName.length > 100) return res.status(400).json({ error: 'Please enter your name.' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || cleanEmail.length > 254)
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  if (cleanMessage.length < 5 || cleanMessage.length > 2000)
    return res.status(400).json({ error: 'Message must be between 5 and 2000 characters.' })

  if (!BREVO_API_KEY || !SENDER_EMAIL || !CONTACT_TO) {
    console.error('Missing BREVO_API_KEY, SENDER_EMAIL, or CONTACT_TO in .env')
    return res.status(500).json({ error: 'Email service is not configured yet.' })
  }

  try {
    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
        to: [{ email: CONTACT_TO }],
        replyTo: { email: cleanEmail, name: cleanName }, // hitting "Reply" goes to the visitor
        subject: `Portfolio message from ${cleanName}`,
        htmlContent: `
          <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(cleanMessage).replace(/\n/g, '<br>')}</p>`,
        textContent: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
      }),
    })

    if (!r.ok) {
      const body = await r.text()
      console.error('Brevo error', r.status, body)
      return res.status(502).json({ error: 'Could not send your message. Please try again later.' })
    }
    res.json({ ok: true })
  } catch (err) {
    console.error('Send failed:', err)
    res.status(502).json({ error: 'Could not send your message. Please try again later.' })
  }
})

// In production, serve the built React app from the same server (after `npm run build`).
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
if (fs.existsSync(dist)) {
  app.use(express.static(dist))
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')))
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
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

// Layer 1: short burst limit per IP (3 messages per 15 minutes)
const burstLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Please try again in a few minutes.' },
})

// Layer 2: daily limit per IP (5 messages per 24 hours)
const dailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Daily message limit reached. Please try again tomorrow.' },
})

// Layer 3: global daily cap across ALL visitors (protects your Brevo quota)
const DAILY_CAP = 30
let sentToday = 0
let capDay = new Date().toDateString()

function underGlobalCap(_req, res, next) {
  const today = new Date().toDateString()
  if (today !== capDay) {
    capDay = today
    sentToday = 0
  }
  if (sentToday >= DAILY_CAP) {
    return res.status(429).json({ error: 'Message limit reached for today. Please email me directly instead.' })
  }
  next()
}

app.get('/api/health', (_req, res) => res.json({ ok: true }))

const buildEmailHtml = ({ name, email, message }) => {
  const time = new Date().toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  const n = escapeHtml(name)
  const e = escapeHtml(email)
  const m = escapeHtml(message).replace(/\n/g, '<br>')

  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 12px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

        <!-- Header -->
        <tr>
          <td style="background:#4f46e5;padding:24px 28px;">
            <div style="color:#c7d2fe;font-size:12px;letter-spacing:1px;text-transform:uppercase;">Portfolio Contact Form</div>
            <div style="color:#ffffff;font-size:22px;font-weight:bold;margin-top:6px;">New message from ${n}</div>
          </td>
        </tr>

        <!-- Sender details -->
        <tr>
          <td style="padding:24px 28px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:90px;color:#6b7280;font-size:13px;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#111827;font-size:15px;font-weight:bold;">${n}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#6b7280;font-size:13px;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:15px;"><a href="mailto:${e}" style="color:#4f46e5;text-decoration:none;">${e}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#6b7280;font-size:13px;">Received</td>
                <td style="padding:10px 0;color:#111827;font-size:15px;">${time} (PH time)</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:16px 28px 8px;">
            <div style="color:#6b7280;font-size:13px;margin-bottom:8px;">Message</div>
            <div style="background:#f9fafb;border-left:4px solid #4f46e5;border-radius:6px;padding:16px 18px;color:#1f2937;font-size:15px;line-height:1.6;">${m}</div>
          </td>
        </tr>

        <!-- Reply button -->
        <tr>
          <td style="padding:20px 28px 28px;">
            <a href="mailto:${e}?subject=${encodeURIComponent('Re: Your message on my portfolio')}"
               style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold;padding:12px 22px;border-radius:8px;">
              Reply to ${n}
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:14px 28px;color:#9ca3af;font-size:12px;border-top:1px solid #f0f0f0;">
            Sent from your portfolio website. You can also just hit Reply on this email.
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

app.post('/api/contact', underGlobalCap, burstLimiter, dailyLimiter, async (req, res) => {
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
        subject: `📩 Portfolio: ${cleanName}`,
        htmlContent: buildEmailHtml({ name: cleanName, email: cleanEmail, message: cleanMessage }),
        textContent: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
      }),
    })

    if (!r.ok) {
      const body = await r.text()
      console.error('Brevo error', r.status, body)
      return res.status(502).json({ error: 'Could not send your message. Please try again later.' })
    }
    sentToday++
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
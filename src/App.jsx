import { useEffect, useState } from 'react'
import { profile, skills, projects, education, highlights } from './data.js'
import { profile, skills, projects, education, highlights, certifications } from './data.js'

const links = [
  ['about', 'About'],
  ['projects', 'Projects'],
  ['education', 'Education'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
]

function Header({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <a className="logo" href="#top">{profile.name}</a>
      <nav className={open ? 'nav open' : 'nav'}>
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
      <div className="header-actions">
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <p className="eyebrow">Hello, I'm</p>
      <h1>{profile.name}</h1>
      <h2>{profile.role}</h2>
      <p className="lead">{profile.tagline}</p>
      <div className="cta">
        <a className="btn primary" href="#projects">View my work</a>
        <a className="btn" href="#contact">Get in touch</a>
      </div>
    </section>
  )
}

function Section({ id, title, children }) {
  return (
    <section className="section" id={id}>
      <h3 className="section-title">{title}</h3>
      {children}
    </section>
  )
}

function About() {
  return (
    <Section id="about" title="About me">
      <div className="about">
        {profile.about.map((p, i) => <p key={i}>{p}</p>)}
        {profile.resumeUrl && (
          <a className="btn" href={profile.resumeUrl} target="_blank" rel="noreferrer">Download résumé</a>
        )}
      </div>
    </Section>
  )
}

function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid">
        {projects.map((p) => (
          <article className="card" key={p.title}>
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            <ul className="tags">
              {p.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <div className="card-links">
              {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live ↗</a>}
              {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Code ↗</a>}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Education() {
  return (
    <Section id="education" title="Education & Highlights">
      <ol className="timeline">
        {education.map((e) => (
          <li key={e.degree + e.school}>
            <span className="period">{e.period}</span>
            <h4>{e.degree} · {e.school}</h4>
            <p>{e.summary}</p>
          </li>
        ))}
      </ol>
      <div className="grid highlights">
        {highlights.map((h) => (
          <div className="card" key={h.title}>
            <h4>{h.title}</h4>
            <p>{h.detail}</p>
          </div>
        ))}
      </div>
      <h4 className="subhead">Certifications & Professional Development</h4>
      <ul className="certs">
        {certifications.map((c) => (
          <li className="card" key={c.title}>
            <span className="period">{c.date}</span>
            <h4>{c.title}</h4>
            <p>{c.issuer}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid">
        {skills.map((s) => (
          <div className="card" key={s.group}>
            <h4>{s.group}</h4>
            <ul className="tags">
              {s.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

// Leave empty in dev and when the server also serves the site.
// Set VITE_API_URL only if the API is hosted on a different domain.
const API_URL = import.meta.env.VITE_API_URL || ''

function Contact() {
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus({ type: 'sending', message: 'Sending…' })
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.')
      form.reset()
      setStatus({ type: 'success', message: "Thanks! Your message was sent. I'll get back to you soon." })
    } catch (err) {
      setStatus({
        type: 'error',
        message: err instanceof TypeError ? 'Could not reach the server. Please try again later.' : err.message,
      })
    }
  }

  return (
    <Section id="contact" title="Contact">
      <p className="lead small">
        Have a project in mind or just want to say hi? Email me at{' '}
        <a href={`mailto:${profile.email}`}>{profile.email}</a> or use the form.
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <label>Name<input name="name" required maxLength={100} autoComplete="name" /></label>
        <label>Email<input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
        <label>Message<textarea name="message" rows="5" required minLength={5} maxLength={2000} /></label>
        {/* Honeypot: hidden from people, bots tend to fill it */}
        <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button className="btn primary" type="submit" disabled={status.type === 'sending'}>
          {status.type === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        {status.type !== 'idle' && status.type !== 'sending' && (
          <p className={`note ${status.type}`} role="status">{status.message}</p>
        )}
      </form>
    </Section>
  )
}

// Icons are keyed by lowercase label. Unknown labels fall back to a link icon.
const icons = {
  github: (
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  x: (
    <>
      <path d="M4 4l16 16" />
      <path d="M20 4l-6.5 6.5M10.5 13.5L4 20" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ),
}

function SocialIcon({ label }) {
  const icon = icons[label.toLowerCase()] || icons.link
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icon}
    </svg>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="socials">
        {profile.socials.map((s) => (
          <a key={s.label} className="social" href={s.url} target="_blank" rel="noreferrer"
            aria-label={s.label} title={s.label}>
            <SocialIcon label={s.label} />
          </a>
        ))}
      </div>
      <p>© {new Date().getFullYear()} {profile.name}. Built with React + Vite.</p>
    </footer>
  )
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* ignore */ }
  }, [theme])

  return (
    <>
      <Header theme={theme} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
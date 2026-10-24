// ✏️ Edit this file to make the portfolio yours. Everything on the page comes from here.

export const profile = {
  name: 'Lynn Czyla Alpuerto',
  role: 'Aspiring Backend Developer',
  tagline: 'Graduating IT student who loves building reliable APIs, databases, and server-side systems. Open to internships and entry-level roles.',
  location: 'Philippines',
  email: 'alpuertolynnczyla@gmail.com',
  about: [
    "Hi! I'm a 4th year student about to graduate, and I enjoy building the part of an app users don't see: APIs, databases, authentication, and the logic that keeps everything running. I care about clean code, security, and systems that are easy to maintain.",
    "I'm looking for my first opportunity, an internship or entry-level role, where I can learn from a team and contribute from day one. This portfolio runs on a small Express API I built myself, with input validation, rate limiting, and email delivery through Brevo.",
  ],
  resumeUrl: '#', // e.g. '/resume.pdf' (put the file in /public)
  socials: [
    { label: 'GitHub', url: 'https://github.com/LynnCzyla' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/lynn-czyla-alpuerto-4a3847445' },
    { label: 'Facebook', url: 'https://www.facebook.com/share/1ExKXxihi9/' },
    { label: 'Instagram', url: 'https://www.instagram.com/lyn_czyla?obrf=MWJqODRxOTBrbmV1cg==' },
  ],
}

export const skills = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'SQL'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'JWT Auth'] },
  { group: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { group: 'Tools', items: ['Git', 'Docker', 'Postman', 'Linux'] },
]

export const projects = [
  {
    title: 'Resource Management Recommender System',
    description:
      'Group capstone that uses OCR and NLP to extract skills from resumes, then recommends qualified employees for project requirements across multiple branches. I built the Express API, authentication and sessions, the skill extraction logic, the recommendation engine, branch-based access, and data backup, and handled deployment and documentation.',
    tags: ['Node.js', 'Express', 'Python', 'Tesseract OCR', 'spaCy', 'Supabase', 'PostgreSQL', 'JWT', 'React', 'Docker'],
    live: 'https://resource-management-recommender-sys.vercel.app/', // ilagay ang Vercel link mo
    repo: 'https://github.com/LynnCzyla/ResourceManagementRecommenderSystem-1.git', // ilagay ang GitHub link mo
  },
  {
    title: 'MAICRAFTS',
    description:
      'Full-stack e-commerce site for a handmade floral crafts shop. I worked mainly on the security of login and sign-up (email OTP verification, two-factor authentication, bcrypt password hashing), audit logging, and email notifications.',
    tags: ['React', 'Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Nodemailer', 'bcrypt', '2FA (TOTP)'],
    live: '#',
    status: 'deploying', // tanggalin ito at ilagay ang totoong link sa `live` kapag deployed na
    repo: 'https://github.com/LynnCzyla/MAICRAFTS', // palitan kung iba ang repo name
  },
  {
    title: 'Project Three',
    description: 'e.g. A service that integrates a third-party API, with caching, validation, and tests. Link to API docs if you have them.',
    tags: ['Node.js', 'MongoDB', 'REST API'],
    live: '#',
    repo: '#',
  },
]

export const education = [
  {
    degree: 'Bachelor of Science in Information Technology', // change to your course
    school: 'Pamantasan ng Lungsod ng Pasig',
    period: '2023 – 2027 (Expected)',
    summary: 'Graduating student. Relevant coursework: Database Systems, Software Engineering, Data Structures and Algorithms, Operating Systems, Networking.',
  },
]

// Capstone/thesis, org involvement, certifications, hackathons, competitions, volunteer work.
// Add or remove items freely. These replace work experience for now.
export const highlights = [
  {
    title: 'Capstone: Resource Management Recommender System',
    detail:
      'Backend lead on a group project. Built the Express API, authentication and sessions, multi-branch data separation, data backup, and the skill extraction and recommendation engine, and helped design the overall system flow. Also deployed the system (Railway, Render, Vercel) and wrote the technical documentation.',
  },
]

export const certifications = [
  { title: 'Computer Systems Servicing (CSS) NC II', issuer: 'TESDA', date: 'National Certificate II Passer' },
  { title: 'Google Cloud Fundamentals: Core Infrastructure', issuer: 'Google Cloud', date: 'August 2026' },
  { title: 'Introduction to SQL', issuer: 'DataCamp', date: 'October 2026', image: '/certs/datacamp-intro-sql.png' },
  { title: 'SHE++ Workshop: Strategic Foresight and Introduction to Technopreneurship', issuer: 'PhilDev S&T Development Foundation, in partnership with Wells Fargo', date: 'June 4, 2025', image: '/certs/she-strategic-foresight.png' },
  { title: 'SHE++ Workshop: Design Thinking', issuer: 'PhilDev S&T Development Foundation, in partnership with Wells Fargo', date: 'June 3, 2025', image: '/certs/she-design-thinking.png' },
]
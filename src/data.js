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
  resumeUrl: '#',
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
    status: 'deploying', 
    repo: 'https://github.com/LynnCzyla/MAICRAFTS', 
  },
  {
    title: 'Smart Entrance, Exit & Attendance Monitoring System',
    description:
      'Desktop-based entrance and exit monitoring system for Pamantasan ng Lungsod ng Pasig (group project, student module). I built the core face recognition logic: a Python FastAPI service using SCRFD face detection and ArcFace embeddings, guided 5-pose registration with image quality checks, and a cosine-similarity matching endpoint that logs every authentication attempt with its confidence score.',
    tags: ['Python', 'FastAPI', 'ArcFace', 'OpenCV', 'MediaPipe', 'Node.js', 'Express', 'MySQL', 'React'],
    repo: 'https://github.com/LynnCzyla/Smart-Entrance-Exit-and-Attendance-Monitoring-System', // palitan kung iba ang repo name
  },
  {
    title: 'PLP Clinic Monitoring System',
    description:
      'Web-based system that replaces paper forms at the Pamantasan ng Lungsod ng Pasig clinic (group project). I worked on both the frontend and backend, mainly the multi-step form for adding a student’s medical information (personal, family, surgical, smoking, alcohol, drug, and maternal history) with duplicate checking and all-or-nothing saving through a database transaction, and the PDF export of the Health Services Medical Record Form.',
    live: '#',
    status: 'deploying', 
    tags: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'jsPDF'],
    repo: 'https://github.com/LynnCzyla/PLP-CLINIC-M-S',
  },
  {
    title: 'Hospital Content Management System',
    description:
      'Hospital CMS with an admin panel and a public website (group project). I built the posting module for news, announcements, and events and careers (image uploads), the editable About (mission, vision, history) and Contact pages, and the backend of the website chatbot, which uses the Groq API and answers from live hospital services and contact data.',
    live: '#',
    status: 'deploying', 
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'Groq API', 'Multer'],
    repo: 'https://github.com/LynnCzyla/SIA-CMS', // palitan kung iba ang repo name
  },
]

export const education = [
  {
    degree: 'Bachelor of Science in Information Technology', 
    school: 'Pamantasan ng Lungsod ng Pasig',
    period: '2023 – 2027 (Expected)',
    summary: 'Graduating student. Relevant coursework: Database Systems, Software Engineering, Data Structures and Algorithms, Operating Systems, Networking.',
  },
]

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
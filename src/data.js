// ✏️ Edit this file to make the portfolio yours. Everything on the page comes from here.

export const profile = {
  name: 'Lynn Czyla Alpuerto',
  role: 'Aspiring Backend Developer',
  tagline: 'Graduating IT student who loves building reliable APIs, databases, and server-side systems. Open to internships and entry-level roles.',
  location: 'Philippines',
  email: 'alpuertolynnczyla@gmail.com',
  about: [
    "Hi! I'm a 4th year student about to graduate, and I enjoy building the part of an app users don't see: APIs, databases, authentication, and the logic that keeps everything running. I care about clean code, security, and systems that are easy to maintain.",
    "I'm looking for my first opportunity, an internship or entry-level role, where I can learn from a team and contribute from day one. Outside of school, I build side projects and learn something new every week.",
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
    title: 'Project One',
    description: 'e.g. REST API with user authentication, role-based access, and CRUD. Mention the problem it solves.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
    live: '#',
    repo: '#',
  },
  {
    title: 'Project Two',
    description: 'e.g. Inventory or enrollment system with a normalized database design, and the number of users or records it handles.',
    tags: ['Python', 'MySQL', 'Docker'],
    live: '#',
    repo: '#',
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
    title: 'Capstone / Thesis Project',
    detail: 'Name of your capstone and a one-line summary of what it does, your role, and the tech stack.',
  },
  {
    title: 'Certifications & Courses',
    detail: 'e.g. freeCodeCamp, Coursera, Google, Meta, or your school\'s certifications.',
  },
]
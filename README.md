# Portfolio (Vite + React)

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview  # preview the production build
```

## Make it yours

- **Content:** edit `src/data.js` (name, bio, projects, skills, experience, social links, email).
- **Colors / fonts:** edit the CSS variables at the top of `src/styles.css`.
- **Résumé:** drop a PDF into `public/` and set `resumeUrl: '/resume.pdf'` in `src/data.js`.
- **Page title:** edit `index.html`.

## Deploy

`npm run build`, then upload `dist/` to Netlify, Vercel, Cloudflare Pages, or GitHub Pages.
For GitHub Pages under a repo path, set `base: '/your-repo-name/'` in `vite.config.js`.

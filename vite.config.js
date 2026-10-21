import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // In dev, forward /api requests to the Express server
    proxy: { '/api': 'http://localhost:3001' },
  },
})
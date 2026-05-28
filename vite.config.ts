import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// NOTE: For GitHub Pages, set base to '/<your-repo-name>/'
// e.g. base: '/real-estate-marketplace/'
export default defineConfig({
  plugins: [react()],
  base: '/real-estate-marketplace/',  // Change this to match your GitHub repo name
})

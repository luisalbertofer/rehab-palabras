import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/rehab-palabras/', // 👈 nombre exacto del repo
  plugins: [react(), tailwindcss()]
})

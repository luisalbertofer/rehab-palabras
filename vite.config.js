import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/rehab-palabras/', // <-- ¡Este campo es esencial!
  plugins: [
    react(),
    tailwindcss()
  ],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/spiritual-health-assessment/',
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})

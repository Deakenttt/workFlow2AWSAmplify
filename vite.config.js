import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // find a aviable network server and set it true for dev --host
  server: {
    host: true
  },
  build: {
    outDir: 'dist'  // This is the default
  }
})

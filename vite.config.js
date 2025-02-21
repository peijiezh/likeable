import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const config = {
  server: {
    port: 3000
  },
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
}

export default defineConfig(config)
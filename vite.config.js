import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base :'/MedGIS/',
  build: {
    target: 'esnext',
    outDir: 'dist',  
    sourcemap: false,
    chunkSizeWarningLimit: 1000,   
  },
  server: {
    open: true,
    port: 5173,
  },
})

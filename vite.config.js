import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: process.env.PORT || 3000, // Usa el puerto de Render o el 3000 por defecto
    host: '0.0.0.0', // Asegúrate de que escuche en todas las interfaces
    proxy: {
      '/api': {
        target: 'http://docutrack.mrdavisdev.com:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  preview: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    allowedHosts: ['dt-front.onrender.com'], // Agrega el host permitido aquí
  },
});
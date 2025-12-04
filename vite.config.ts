import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    allowedHosts: true,
    proxy: {
      // Se necessário, adicione configurações de proxy aqui
      // '/api': {
      //   target: 'http://localhost:5000',
      //   changeOrigin: true,
      //   secure: false,
      // }
    }
  },
  plugins: [react()],
})

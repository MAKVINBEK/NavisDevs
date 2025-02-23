import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: "https://navisdevs.ru",
    changeOrigin: true,
    secure: false,  
    logLevel: "debug",  
    pathRewrite: { "^/api": "" }, 
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader("Origin", "https://navisdevs.ru");}
    }
  }
}})

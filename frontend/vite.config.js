import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // GitHub Pages base path
  // Using custom domain (CNAME), so base is root
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})

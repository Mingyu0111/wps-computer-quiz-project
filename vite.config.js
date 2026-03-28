import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 👈 新增这一行

export default defineConfig({
  base: '/wps-computer-quiz-project/', 
  plugins: [
    tailwindcss(), // 👈 新增这一行
    react()
  ],
  resolve: {
    dedupe: ['react', 'react-dom']
  }
})
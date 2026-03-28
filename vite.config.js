import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/wps-quiz/', // 注意斜杠，必须和你的 GitHub 仓库名一致
  plugins: [react()],
})
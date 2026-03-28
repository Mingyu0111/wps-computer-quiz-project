import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/wps-computer-quiz-project/', 
  plugins: [react()],
  // 增加下面这段配置，强制去重，只使用唯一的一个 React 实例
  resolve: {
    dedupe: ['react', 'react-dom']
  }
})
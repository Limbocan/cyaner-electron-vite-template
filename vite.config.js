import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: process.env.ELECTRON == 'true' ? './' : '',
  plugins: [vue()],
  build: {
    // 打包前端页面到app目录
    outDir: 'app/dist'
  }
})

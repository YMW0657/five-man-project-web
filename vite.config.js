import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173, // 设置服务启动端口号
    host: '0.0.0.0', // 设置服务启动地址
    open: false, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    // 设置代理，根据我们项目实际情况配置
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        ws: false,
        changeOrigin: true,
        rewrite: path=> path.replace(/^\/api/, '')
        // autoRewrite:true, //:() => '' // {'^/api' : ''}
      }
    }
  }
})

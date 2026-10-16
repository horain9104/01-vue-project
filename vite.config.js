import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  // 部署 GitHub Pages 时设置子路径 base（值为 /你的仓库名/，须与 GitHub 仓库名一致）。
  // 本地开发不受影响（Vite 自动以 base 前缀处理资源路径）。
  base: '/01-vue-project/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
// import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  // 配置别名
  // alias: {
  //   '@': path.join(__dirname, './src'),
  //   '@components': path.join(__dirname, './src/components'),
  //   '@utils': path.join(__dirname, './src/utils')
  // }
})
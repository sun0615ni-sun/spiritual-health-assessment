import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // 插件配置：使用 React 插件
  plugins: [react()],
  
  // 基礎路徑：GitHub Pages 部署時需要設定為倉庫名稱
  // 格式：/倉庫名稱/（注意前後都要有斜線）
  base: '/spiritual-health-assessment/',
  
  // 路徑別名配置：讓 @ 指向 src 目錄
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // 建置配置
  build: {
    // 輸出目錄
    outDir: 'dist',
    // 靜態資源目錄
    assetsDir: 'assets',
    // 不生成 source map（減少檔案大小）
    sourcemap: false,
    // Rollup 配置：優化打包
    rollupOptions: {
      output: {
        // 手動分割代碼塊，優化載入性能
        manualChunks: {
          // 將 React 相關庫打包到 vendor 塊
          vendor: ['react', 'react-dom'],
          // 將 UI 組件庫打包到 ui 塊
          ui: ['lucide-react'],
          // 將圖表庫打包到 charts 塊
          charts: ['recharts']
        }
      }
    }
  },
  
  // 開發伺服器配置
  server: {
    // 開發伺服器端口
    port: 5173,
    // 允許外部訪問（0.0.0.0 表示所有 IP）
    host: '0.0.0.0'
  },
  
  // 預覽伺服器配置（用於測試建置結果）
  preview: {
    // 預覽伺服器端口
    port: 4173,
    // 允許外部訪問
    host: '0.0.0.0'
  }
})

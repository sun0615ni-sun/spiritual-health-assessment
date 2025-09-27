import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // IMPORTANT: 將 base 設為你的 repo 名稱路徑（注意前後斜線）
  base: '/spiritual-health-assessment/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});

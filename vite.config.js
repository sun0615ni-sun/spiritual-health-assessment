import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // *** 最重要：設定 GitHub Pages 的 base 為 repo 名稱（注意前後斜線） ***
  base: '/spiritual-health-assessment/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});

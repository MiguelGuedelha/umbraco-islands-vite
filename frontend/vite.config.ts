import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  plugins: [react(), tailwindcss()],
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, '../backend/Umbraco.Islands/wwwroot/assets'),
    assetsDir: '.',
    rollupOptions: {
      input: resolve(__dirname, './src/main.tsx')
    }
  }
});

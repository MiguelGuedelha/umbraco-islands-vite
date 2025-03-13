import { defineConfig, mergeConfig } from 'vite';
import baseConfig from './vite.config.js';

export default mergeConfig(
  baseConfig,
  defineConfig({
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              console.log(id);
              return 'vendor';
            }
            if (id.includes('@/components')) {
              console.log(id);
              return 'components';
            }
          },
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.names[assetInfo.names.length - 1].split('.')[1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img';
            }
            return `${extType}/[name].[hash][extname]`;
          },
          chunkFileNames: 'js/[name].[hash].js',
          entryFileNames: 'js/[name].[hash].js'
        }
      }
    }
  })
);

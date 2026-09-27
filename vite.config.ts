import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@hooks': path.resolve(import.meta.dirname, './src/hooks'),
      '@store': path.resolve(import.meta.dirname, './src/store'),
      '@types': path.resolve(import.meta.dirname, './src/types'),
      '@utils': path.resolve(import.meta.dirname, './src/utils'),
      '@services': path.resolve(import.meta.dirname, './src/services'),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('zustand')) return 'vendor';
            if (id.includes('@dnd-kit')) return 'dnd';
            if (id.includes('lucide-react') || id.includes('react-hot-toast')) return 'ui';
            if (id.includes('@tanstack')) return 'query';
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    copyPublicDir: false,
    emptyOutDir: false,
    lib: {
      entry: fileURLToPath(new URL('./src/carousel-3d/index.js', import.meta.url)),
      name: 'carousel-3d',
      formats: ['umd'],
      fileName: () => 'carousel-3d.umd.min.js'
    },
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})

import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  server: {
    open: '/dev/',
  },
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'window',
      fileName: 'colorpicker',
      formats: ['iife', 'es'],
    },
    minify: true,
    rollupOptions: {
      external: ['bootstrap'],
      output: {
        extend: true,
        globals: {
          bootstrap: 'bootstrap',
        },
        assetFileNames: 'colorpicker.[ext]',
      },
    },
  },
  plugins: [dts({ rollupTypes: true })],
})
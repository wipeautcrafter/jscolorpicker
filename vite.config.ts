import { resolve } from 'path'
import { defineConfig } from 'vite'

import dts from 'vite-plugin-dts'
import viteHTML from './plugins/viteHTML'

export default defineConfig({
  server: {
    open: '/dev/',
  },
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'ColorPicker',
      fileName: 'colorpicker',
      formats: ['iife', 'es'],
    },
    rollupOptions: {
      output: {
        assetFileNames: 'colorpicker.[ext]',
      },
    },
    minify: false,
    cssMinify: false,
  },
  plugins: [dts({ rollupTypes: true }), viteHTML()],
})

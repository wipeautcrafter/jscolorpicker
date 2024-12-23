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
      name: 'ColorPicker',
      fileName: 'colorpicker',
      formats: ['iife', 'es'],
    },
    minify: true,
    rollupOptions: {
      output: {
        assetFileNames: 'colorpicker.[ext]',
      },
    },
  },
  plugins: [dts({ rollupTypes: true })],
})

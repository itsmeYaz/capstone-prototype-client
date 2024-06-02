import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import Unfonts from 'unplugin-fonts/vite'

export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      custom: {
        families: [
          {
            name: 'Poppins',
            src: './src/assets/fonts/poppins/*.ttf',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

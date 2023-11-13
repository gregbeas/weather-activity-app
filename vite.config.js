// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        weather: resolve(__dirname, 'pages/weather.html'),
        activites: resolve(__dirname, 'pages/activities.html'),
      },
    },
  },
})
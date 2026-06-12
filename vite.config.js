import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.browser': 'true',
    'process.env': '{}',
  },
  server: {
    port: 5173,
    host: true,
  },
  resolve: {
    alias: {
      'next/link': path.resolve('./src/shims/next-router.js'),
      'next/router': path.resolve('./src/shims/next-router.js'),
      'next/dist/client/router': path.resolve('./src/shims/next-router.js'),
      'next/config': path.resolve('./src/shims/next-config.js'),
      'next/head': path.resolve('./src/shims/next-head.jsx'),
      'nextjs-progressbar': path.resolve('./src/shims/nextjs-progressbar.jsx'),
    },
  },
})

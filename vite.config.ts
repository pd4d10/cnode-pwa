import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import pages from 'vite-plugin-pages'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [svgr(), pages({ resolver: 'react' }), react(), tsconfigPaths()],
})

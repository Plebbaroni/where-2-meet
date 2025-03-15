// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '');
//   return {
//     define: {
//       'process.env.GOOGLE_MAPS_KEY': JSON.stringify(env.GOOGLE_MAPS_KEY)
//     },
//     plugins: [react()],
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      lodash: 'lodash-es'
    }
  },
  plugins: [react()],
})
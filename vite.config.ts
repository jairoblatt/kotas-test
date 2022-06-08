import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImports from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import svgLoader from 'vite-svg-loader';
// @ts-ignore
const path = require('path');

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'url',
    }),
    AutoImports({
      imports: [
        'vue',
        'vue-router',
        { 'vue-query': ['useInfiniteQuery', 'useQuery', 'useQueryClient'] },
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
      dirs: ['src/components/global'],
      dts: 'src/global-components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      // @ts-ignore
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
});

/// <reference types="vitest" />
/// <reference types="vite/client" />
import { ConfigEnv, UserConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import legacy from '@vitejs/plugin-legacy';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  console.log('mode', mode);
  return {
    envDir: './env',
    plugins: [
      solidPlugin(),
      legacy({
        targets: ['Android>=4.1', 'iOS>=9', 'Chrome>=30'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime.js']
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[name]',
        inject: 'body-first',
        customDomId: '__svg__icons__dom__'
      })
    ],
    server: {
      port: 8100
    },
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
    },
    build: {
      // target: 'esnext',
      chunkSizeWarningLimit: 1200,
      assetsDir: 'static/img/',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  };
};

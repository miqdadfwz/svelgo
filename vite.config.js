import { readFileSync } from 'fs';
import { defineConfig } from 'vite';
import { config } from 'dotenv-safe';
import tsconfigPaths from 'vite-tsconfig-paths';
import sveltePreprocess from 'svelte-preprocess';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default () => {
  const isDev = process.env.NODE_ENV === 'development';
  const isSSR = process.env.SSR_MODE === '1';
  const { parsed } = config();

  return defineConfig({
    build: {
      manifest: true,
      sourcemap: isDev,
    },
    server: {
      https: {
        key: readFileSync(parsed.SSL_KEY),
        cert: readFileSync(parsed.SSL_CERT),
      },
    },
    optimizeDeps: {
      exclude: ['svelte'],
    },
    plugins: [
      svelte({
        hot: isDev,
        compilerOptions: {
          dev: isDev,
          hydratable: !isSSR,
          generate: isSSR ? 'ssr' : 'dom',
        },
        preprocess: [
          sveltePreprocess({
            sourceMap: isDev,
            postcss: {
              plugins: [require('tailwindcss')(), require('autoprefixer')()],
            },
          }),
        ],
      }),
      tsconfigPaths(),
    ],
    define: {
      __DEV__: isDev,
    },
  });
};

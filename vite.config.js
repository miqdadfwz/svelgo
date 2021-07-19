import fs from 'fs';
import { defineConfig } from 'vite';
import { config } from 'dotenv-safe';
import sveltePreprocess from 'svelte-preprocess';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default () => {
  const isDev = process.env.NODE_ENV === 'dev';
  const isSSR = process.env.SSR_MODE === '1';
  const { parsed } = config();

  return defineConfig({
    server: {
      https: {
        key: fs.readFileSync(parsed.SSL_KEY),
        cert: fs.readFileSync(parsed.SSL_CERT),
      },
    },
    plugins: [
      svelte({
        hot: isDev,
        emitCss: true,
        compilerOptions: {
          dev: isDev,
          hydratable: isSSR,
        },
        preprocess: [
          sveltePreprocess({
            postcss: true,
          }),
        ],
      }),
      { enforce: 'pre' },
    ],
  });
};

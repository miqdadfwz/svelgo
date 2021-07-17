import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

export default () => {
  const isDev = process.env.NODE_ENV === 'dev';
  const isSSR = process.env.SSR_MODE === '1';

  return defineConfig({
    resolve: {
      dedupe: ['svelte'],
    },
    optimizeDeps: {
      exclude: ['svelte'],
    },
    plugins: [
      svelte({
        hot: isDev,
        compilerOptions: {
          hydratable: isSSR,
        },
        preprocess: [
          sveltePreprocess({
            postcss: true,
          }),
        ],
      }),
    ],
  });
};

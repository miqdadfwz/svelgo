// only for svelte-vscode plugin
const preprocess = require('svelte-preprocess');

module.exports = {
  preprocess: [
    preprocess({
      postcss: {
        plugins: [require('tailwindcss')(), require('autoprefixer')()],
      },
      defaults: {
        style: 'postcss',
      },
    }),
  ],
};

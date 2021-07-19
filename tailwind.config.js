module.exports = {
  jit: true,
  purge: {
    content: ['./index.html', './src/**/*.{svelte,js,ts}'],
    enabled: process.env.NODE_ENV === 'production',
  },
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

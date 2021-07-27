import App from './App.svelte';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(() => {
      if (window['__DEV__']) {
        console.log('[sw] service Worker registration completed.');
      }
    });
  });
}

const app = new App({ target: document.body, hydrate: window.SSR || false });

export default app;

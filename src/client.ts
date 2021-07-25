import App from './App.svelte';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(() => {
      console.log('Service Worker registration completed.');
    });
  });
}

const app = new App({ target: document.body, hydrate: window.SSR || false });

export default app;

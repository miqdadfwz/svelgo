import App from './App.svelte';

const app = new App({ target: document.body, hydrate: window.SSR || false });

export default app;

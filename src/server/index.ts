import App from '../client/App.svelte';

interface RenderReturn {
  html: string;
  head: string;
  css: {
    code: string;
    map: unknown;
  };
}

const render = (): RenderReturn => {
  return App['render']();
};

export default render;

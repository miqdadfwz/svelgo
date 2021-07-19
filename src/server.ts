import App from './App.svelte';

interface RenderParams {
  url: string;
  template: string;
}

interface RenderReturn {
  body: string;
  url: string;
  headers: Record<string, string>;
  status: number;
}

const render = (renderParams: RenderParams): RenderReturn => {
  return (App as any).render({
    name: 'Stranger',
  });
};

export default render;

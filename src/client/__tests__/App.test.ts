import { render } from '@testing-library/svelte';
import App from '../App.svelte';

describe('src/App.svelte', () => {
  it('should succesfully render App.svelte', () => {
    const { getByText } = render(App);

    expect(getByText('If you see this page, SvelGo! is succesfully running in CSR mode.')).toBeVisible();

    expect(getByText('Learn Svelte')).toBeVisible();
    expect(getByText('Learn Svelte')).toHaveAttribute('href', 'https://svelte.dev/tutorial');

    expect(getByText('Documentation')).toBeVisible();
    expect(getByText('Documentation')).toHaveAttribute('href', 'https://github.com/miqdadfwz/svelgo');
  });
});

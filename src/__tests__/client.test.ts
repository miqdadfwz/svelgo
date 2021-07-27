import client from '../client';
import App from '../App.svelte';

describe('src/client.ts', () => {
  it('should initiate App', () => {
    expect(client).toBeInstanceOf(App);
  });
});

import client from '..';
import App from '../App.svelte';

describe('src/client.ts', () => {
  it('should initiate App', () => {
    expect(client).toBeInstanceOf(App);
  });
});

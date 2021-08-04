<script lang="ts">
  import './global.css';

  const isCSR = typeof window !== 'undefined' && !window.SSR;

  export let text: string = `If you see this page, SvelGo! is succesfully running in ${isCSR ? 'CSR' : 'SSR'} mode.`;
</script>

<section class="text-gray-600 body-font">
  <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
    <div class="text-center lg:w-2/3 w-full">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
        Svel<span style="color:#ff3e00">Go!</span>
      </h1>
      <p class="mb-4">{text}</p>
      <div class="text-sm">
        <a class="hover:underline" href="https://svelte.dev/tutorial" target="_blank" rel="noopener noreferrer">
          Learn Svelte
        </a>
        <span>|</span>
        <a class="hover:underline" href="https://github.com/miqdadfwz/svelgo" target="_blank" rel="noopener noreferrer">
          Documentation
        </a>
      </div>
    </div>
  </div>
</section>

<img width="138" alt="Screen Shot 2021-08-05 at 17 51 33" src="https://user-images.githubusercontent.com/43945767/128338446-0e8e345f-4de5-43bb-8da7-b9984ab6c676.png">

[![Test CI](https://github.com/miqdadfwz/svelgo/workflows/Unit/badge.svg)](https://github.com/miqdadfwz/svelgo/actions)
[![License](https://img.shields.io/github/license/miqdadfwz/svelgo?label=License)](https://github.com/miqdadfwz/svelgo/blob/master/LICENSE)

> Svelte baseline with pre-configured rich environment. Set up with simple command and you're set to Go!

[Getting Started](https://github.com/miqdadfwz/svelgo#getting-started) | [Features](https://github.com/miqdadfwz/svelgo#features) | [Project Strucure](https://github.com/miqdadfwz/svelgo#project-structure) | [Contributing](https://github.com/miqdadfwz/svelgo#contributing) | [License](https://github.com/miqdadfwz/svelgo#license)

## Getting Started
Create rapid svelte application with zero build configuration until you need it, just focus to what you need to make. It supports both client and server side rendering, run the rendering strategy based on your project requirement.

### Installation

```bash
npx degit miqdadfwz/svelgo my-svelte-project
cd ./my-svelte-project
bash ./scripts/setup.sh
```

### Development
```bash
# Run CSR local development server
# it will serve https://localhost:3001
npm run dev:client

# Run SSR local development server
# it will serve https://localhost:3000
npm run dev:server
```

### Production
```bash
# Build both server and client environments
# and generate production ready HTML files and assets that necessary to deploy and run 
# your application.
npm run build:client

# Run the server locally for the production preview
npm run start:server
npm run start:client
```

### Test
```bash
# Run unit test
npm run test
# Or run test coverage
npm run test --coverage
```

## Features
- **Vite**: An opinionated lightning-fast web build tool. With minimum configuration, vite provides fast development experience because it leverages native ES modules and doesn’t need to rebuild the whole bundle when something changes. For the compilation, Vite is using esbuild to transpile TypeScript which significantly faster than `tsc`.
- **Workbox**: Enhance modern PWA APIs to deliver improved capabilities along with reliability and installability on any device. You can get benefits from PWA features (offline UI, client caching, etc) thanks to [Workbox](https://developers.google.com/web/tools/workbox).
- **TypeScript**: This project is built on TypeScript with the intention of improving the developer experience and secure development.
- **TailwindCSS**: Utility-first modern CSS framework for rapidly building custom user interfaces, it lets you easily get started styling your website or application. No runtime cost needed.
- **Koa**: Light node.js fremework to utilize SSR support.
- **svelte-testing-library**: Along with Jest, svelte-testing-library provide simple API to render svelte component in test by avoiding implementation details.

And other utilities which may help you to collaborate with others.

## Project Structure
```bash
.
├── LICENSE
├── commitlint.config.js
├── index.html
├── jest.config.js
├── jest.setup.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public
│   ├── icons
│   │   ├── favicon.ico
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-152x152.png
│   │   ├── icon-192x192.png
│   │   ├── icon-384x384.png
│   │   ├── icon-512x512.png
│   │   ├── icon-72x72.png
│   │   └── icon-96x96.png
│   ├── offline.html
│   ├── pwa
│   │   └── manifest.json
│   └── sw.js
├── scripts
│   └── setup.sh
├── serve.dev.js
├── src
│   ├── __mocks__
│   │   └── styles.mock.js
│   ├── client
│   │   ├── App.svelte
│   │   ├── __tests__
│   │   │   ├── App.test.ts
│   │   │   └── index.test.ts
│   │   ├── global.css
│   │   ├── global.d.ts
│   │   └── index.ts
│   └── server
│       ├── index.ts
│       └── start.prod.ts
├── ssl
│   ├── localhost+2-key.pem
│   └── localhost+2.pem
├── svelte.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.js
```

## Contributing
### Pull Request
PRs to this prject is always welcome and can be a quick way to get your fix or improvement for the next release. In general, PRs should:

- Only fix/add the functionality in question OR address wide-spread whitespace/style issues, not both.
- Add unit or integration tests for fixed or changed functionality.
- Address a single concern in the least number of changed lines as possible.
- Include documentation in the repo or on our docs site.
- For changes that address core functionality or would require breaking changes (e.g. a major release), it's best to open an Issue to discuss your proposal first. This is not required but can save time creating and reviewing changes.


### Issues
If you find an Issue that addresses the problem you're having, please add your own reproduction information to the existing issue rather than creating a new one. Adding a reaction can also help be indicating to our maintainers that a particular problem is affecting more than just the reporter.

## License
[MIT](https://github.com/miqdadfwz/svelgo/blob/master/LICENSE) 

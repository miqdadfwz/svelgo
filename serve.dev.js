const fs = require('fs');
const path = require('path');
const https = require('https');

const Koa = require('koa');
const c2k = require('koa-connect');
const Router = require('@koa/router');
const compress = require('koa-compress');
const logger = require('koa-pino-logger');

const { createServer: createViteServer } = require('vite');
const { config } = require('dotenv-safe');
const prettifier = require('pino-colada');

const postcss = require('postcss');
const cssnano = require('cssnano');
const litePreset = require('cssnano-preset-lite');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');

const getHTML = () => fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
const getJS = () => `<script>window.SSR=true;</script>`;
const genCSS = async () => {
  const tailwindcssConfig = require('./tailwind.config');
  const preset = litePreset({ discardComments: false });

  return postcss([
    autoprefixer,
    tailwindcss(tailwindcssConfig),
    cssnano({
      preset,
    }),
    purgecss({ ...tailwindcssConfig.purge, enabled: true }),
  ]).process(fs.readFileSync(path.resolve(__dirname, 'src/client/global.css'), 'utf-8'), {
    from: path.resolve(__dirname, 'src/client/global.css'),
  });
};

const createKoaServer = (callback) => {
  try {
    const { parsed } = config();
    const httpsServer = https.createServer(
      {
        key: fs.readFileSync(parsed.SSL_KEY),
        cert: fs.readFileSync(parsed.SSL_CERT),
      },
      callback,
    );

    return httpsServer;
  } catch (error) {
    console.error('Faild to start HTTPS server\n', error, error && error.stack);
    process.exit(1);
  }
};

const serve = async () => {
  const app = new Koa();
  const router = new Router();

  const server = createKoaServer(app.callback());
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
  });

  app.use(
    logger({
      prettifier,
      prettyPrint: {},
    }),
  );

  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(compress());
  app.use(c2k(vite.middlewares));

  app.use(async (ctx, next) => {
    try {
      const url = ctx.req.url;
      const { default: render } = await vite.ssrLoadModule(path.resolve(__dirname, 'src/server/index.ts'));
      const rendered = await render();

      const { css } = await genCSS();
      const js = getJS();

      const template = await vite.transformIndexHtml(url, getHTML());
      const html = template
        .replace('<!--ssr-body-->', rendered.html)
        .replace('<!--ssr-head-->', rendered.head)
        .replace('<!--ssr-script-->', js)
        .replace('/* ssr-css */', css);

      ctx.res.statusCode = 200;
      ctx.res.setHeader('Content-Type', 'text/html');
      ctx.body = html;

      next();
    } catch (error) {
      vite.ssrFixStacktrace(error);
      ctx.log.error(error);

      next(error);
    }
  });

  server.listen(process.env.PORT, () => {
    console.info(`> Development server listening on https://localhost:${process.env.PORT}`);
  });
};

serve();

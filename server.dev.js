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

const getHTML = () => {
  return fs.readFileSync('index.html', 'utf-8');
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
      const { default: render } = await vite.ssrLoadModule(path.resolve(__dirname, 'src/server.ts'));
      const rendered = await render();
      const head = `<style>${rendered.css.code}</style>`;

      const template = await vite.transformIndexHtml(url, getHTML());
      const html = template.replace('<!--ssr-body-->', rendered.html).replace('<!--ssr-head-->', head);

      ctx.res.statusCode = 200;
      ctx.res.setHeader('Content-Type', 'text/html');
      ctx.body = html;
    } catch (error) {
      vite.ssrFixStacktrace(error);
      ctx.log.error(error);

      next(error);
    }
  });

  server.listen(process.env.PORT, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.info(`> Server listening on https://localhost:${process.env.PORT}`);
  });
};

serve();

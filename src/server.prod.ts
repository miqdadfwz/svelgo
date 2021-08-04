/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */

import fs from 'fs';
import path from 'path';

import Koa from 'koa';
import serveStatic from 'koa-static';
import Router from '@koa/router';
import compress from 'koa-compress';
import logger from 'koa-pino-logger';
import mount from 'koa-mount';

import prettifier from 'pino-colada';
import render from './server.serve';

const getHTML = () => fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8');

/**
 * Used to extract critical stylesheet and inline this with
 * HTML docs
 * @return {string}
 */
const getCSS = (): string => {
  const manifest = require(path.resolve(__dirname, '..', 'manifest.json'));
  const compiledCssPath = manifest['index.html'].css[0];
  const compiledCss = fs.readFileSync(path.resolve(__dirname, '..', compiledCssPath), 'utf-8');

  return compiledCss;
};

const getJS = () => `<script>window.SSR=true;</script>`;

const serve = async () => {
  const app = new Koa();
  const router = new Router();

  app.use(
    logger({
      prettifier,
      prettyPrint: {},
    }),
  );

  app.use(mount('/assets', serveStatic(path.resolve(__dirname, '../assets'))));
  app.use(mount('/icons', serveStatic(path.resolve(__dirname, '../icons'))));
  app.use(mount('/pwa', serveStatic(path.resolve(__dirname, '../pwa'))));

  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(compress());

  app.use(async (ctx, next) => {
    try {
      if (ctx.path === '/sw.js') {
        const swPath = path.resolve(__dirname, '../sw.js');
        const sw = fs.readFileSync(swPath, 'utf-8');

        ctx.res.statusCode = 200;
        ctx.res.setHeader('Content-Type', 'application/javascript');
        ctx.res.setHeader('Cache-Control', 'no-cache');

        ctx.res.end(sw);
      } else {
        const rendered = render();
        const js = getJS();
        const css = getCSS();

        const template = getHTML();
        const html = template
          .replace('<!--ssr-body-->', rendered.html)
          .replace('<!--ssr-head-->', rendered.head)
          .replace('/* ssr-css */', css)
          .replace('<!--ssr-script-->', js);

        ctx.res.statusCode = 200;
        ctx.res.setHeader('Content-Type', 'text/html');
        ctx.body = html;

        next();
      }
    } catch (error) {
      ctx.log.error(error);

      next();
    }
  });

  app.listen(process.env.PORT || 3000, () => {
    console.info(`> Production server listening on https://localhost:${process.env.PORT || 3000}`);
  });
};

serve();

require('ejs');

const express = require('express');
const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const { join } = require('path');

const { AppModule } = require('../dist/app.module');

module.exports = async (req, res) => {

  const server = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  const viewsPath = join(process.cwd(), 'dist', 'views');

  app.setBaseViewsDir(viewsPath);
  app.setViewEngine('ejs');

  await app.init();

  return server(req, res);
};
require('ejs');

const express = require('express');
const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const { join } = require('path');

const { AppModule } = require('../dist/app.module');

let cachedServer;

module.exports = async (req, res) => {

  if (!cachedServer) {

    const expressApp = express();

    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    nestApp.setBaseViewsDir(join(process.cwd(), 'dist', 'views'));
    nestApp.setViewEngine('ejs');

    await nestApp.init();

    cachedServer = expressApp;
  }

  return cachedServer(req, res);
};
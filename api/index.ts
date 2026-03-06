// api/index.js
require('ejs');
const express = require('express');
const fs = require('fs');
const { join } = require('path');
const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');

// require del AppModule compilado
const { AppModule } = require('../dist/app.module');

module.exports = async (req, res) => {
  // creado Express y adapter explícito para asegurar setBaseViewsDir está disponible
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const viewsPath = join(process.cwd(), 'dist', 'views');
  console.log('Resolved viewsPath:', viewsPath);

  // fallback seguro si no existe (solo para ver logs, evita crash)
  if (!fs.existsSync(viewsPath)) {
    console.error('ERROR: dist/views no existe. Archivos en root:', fs.readdirSync(process.cwd()));
  }

  app.setBaseViewsDir(viewsPath);
  app.setViewEngine('ejs');

  await app.init();

  return server(req, res);
};
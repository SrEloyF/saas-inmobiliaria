require('ejs');

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { join } from 'path';
import fs from 'fs';

export default async function handler(req: any, res: any) {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  console.log('ROOT FILES:', fs.readdirSync(process.cwd()));
  console.log('SRC FILES:', fs.readdirSync(join(process.cwd(), 'src')));

  const possiblePaths = [
    join(process.cwd(), 'views'),
    join(process.cwd(), 'src/views'),
    join(__dirname, '../views'),
    join(__dirname, '../src/views'),
  ];

  let viewsPath = possiblePaths.find(p => fs.existsSync(p)) || possiblePaths[0];

  console.log('Resolved viewsPath:', viewsPath);

  app.setBaseViewsDir(viewsPath);
  app.setViewEngine('ejs');

  await app.init();

  const server = app.getHttpAdapter().getInstance();
  return server(req, res);
}
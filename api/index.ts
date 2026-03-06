require('ejs');
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { join } from 'path';

export default async function handler(req: any, res: any) {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const viewsPath = join(process.cwd(), 'src/views');

  console.log('ViewsPath:', viewsPath);

  app.setBaseViewsDir(viewsPath);
  app.setViewEngine('ejs');

  await app.init();

  const server = app.getHttpAdapter().getInstance();
  return server(req, res);
}
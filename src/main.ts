import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  await app.listen(process.env.PORT || 3000);
}

if (process.env.VERCEL) {
  module.exports = async (req: any, res: any) => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setBaseViewsDir(join(__dirname, 'views'));
    app.setViewEngine('ejs');

    await app.init();

    const httpAdapter = app.getHttpAdapter();
    const expressInstance = httpAdapter.getInstance();

    expressInstance(req, res);
  };
} else {
  bootstrap();
}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { VentasModule } from './ventas/ventas.module';
import { ConfigModule } from '@nestjs/config';
import { ClientesService } from './clientes/clientes.service';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [
    PrismaModule,
    VentasModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ClientesService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientesService } from './clientes.service';

@Module({
  imports: [PrismaModule],
  providers: [ClientesService],
  controllers: [ClientesController]
})
export class ClientesModule {}

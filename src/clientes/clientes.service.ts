import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EstadoCivil, Equipo, Prisma } from '@prisma/client';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.cliente.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.cliente.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ClienteCreateInput) {
    return this.prisma.cliente.create({
      data,
    });
  }

  async update(id: number, data: any) {
    const updateData: Prisma.ClienteUpdateInput = {
      nombre_completo: data.nombre_completo,
      celular: data.celular,
      dni_ruc: data.dni_ruc,
      direccion: data.direccion,
      distrito: data.distrito,
      provincia: data.provincia,
      departamento: data.departamento,
      ocupacion: data.ocupacion,
    };

    // Solo asignar si viene el valor válido
    if (data.estado_civil && EstadoCivil[data.estado_civil as keyof typeof EstadoCivil]) {
      updateData.estado_civil = { set: EstadoCivil[data.estado_civil as keyof typeof EstadoCivil] };
    }

    if (data.equipo && Equipo[data.equipo as keyof typeof Equipo]) {
      updateData.equipo = { set: Equipo[data.equipo as keyof typeof Equipo] };
    }

    return this.prisma.cliente.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    return this.prisma.cliente.delete({
      where: { id },
    });
  }
}
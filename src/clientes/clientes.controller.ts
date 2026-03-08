import { Controller, Get, Post, Body, Param, Render, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ClientesService } from './clientes.service';
import { Prisma, EstadoCivil, Equipo } from '@prisma/client';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) { }

  @Get()
  @Render('clientes/index')
  async index() {
    const clientes = await this.clientesService.findAll();
    return { clientes };
  }

  @Get('create')
  @Render('clientes/create')
  createForm() {
    return {};
  }

  @Post()
  async create(@Body() body: Prisma.ClienteCreateInput, @Res() res: Response) {
    await this.clientesService.create(body);
    return res.redirect('/clientes');
  }

  @Get(':id/edit')
  @Render('clientes/edit')
  async editForm(@Param('id') id: string) {
    const cliente = await this.clientesService.findOne(+id);
    return { cliente };
  }

  @Post(':id/edit')
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @Res() res: Response
  ) {

    const data: Prisma.ClienteUpdateInput = {
      ...body,
      estado_civil: body.estado_civil as EstadoCivil,
      equipo: body.equipo as Equipo,
    };

    await this.clientesService.update(+id, data);

    return res.redirect('/clientes');
  }

  @Post(':id/delete')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.clientesService.remove(+id);
    return res.redirect('/clientes');
  }
}
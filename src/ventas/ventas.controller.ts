import { Controller, Get, Post, Body, Render, Res, Param } from '@nestjs/common';
import type { Response } from 'express';
import { VentasService } from './ventas.service';

@Controller('')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Get()
  @Render('ventas/index')
  async index() {
    const ventas = await this.ventasService.findAll();
    return { ventas };
  }

  @Get('create')
  @Render('ventas/create')
  async createForm() {
    const data = await this.ventasService.getFormData();
    return { clientes: data.clientes };
  }

  @Post()
  async create(@Body() body: any, @Res() res: Response) {
    try {
      await this.ventasService.create(body);
      return res.redirect('/');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error al crear la venta');
    }
  }

  @Get(':id/edit')
  @Render('ventas/edit')
  async editForm(@Param('id') id: string) {
    const venta = await this.ventasService.findOne(+id);
    const data = await this.ventasService.getFormData();

    const formatHTMLDate = (dateObj: Date | null) => {
      if (!dateObj) return '';
      return dateObj.toISOString().split('T')[0];
    };

    return { 
      venta, 
      clientes: data.clientes,
      mes_ultimo_deposito_str: formatHTMLDate(venta.mes_ultimo_deposito),
      fecha_firma_contrato_str: formatHTMLDate(venta.fecha_firma_contrato),
      fecha_final_pago_str: formatHTMLDate(venta.fecha_final_pago)
    };
  }

  @Post(':id/edit')
  async update(@Param('id') id: string, @Body() body: any, @Res() res: Response) {
    try {
      await this.ventasService.update(+id, body);
      return res.redirect('/');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error al actualizar la venta');
    }
  }

  @Post(':id/delete')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.ventasService.remove(+id);
    return res.redirect('/');
  }
}
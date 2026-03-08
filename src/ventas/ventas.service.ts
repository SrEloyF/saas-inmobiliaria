import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VentasService {
  constructor(private prisma: PrismaService) { }

  async findOne(id: number) {
    return this.prisma.venta.findUniqueOrThrow({
      where: { id },
      include: { cliente: true, asesor: true },
    });
  }

  async findAll() {
    return this.prisma.venta.findMany({
      include: { cliente: true, asesor: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async getFormData() {
    const clientes = await this.prisma.cliente.findMany({
      orderBy: { nombre_completo: 'asc' }
    });
    return { clientes };
  }

  async create(body: any) {
    const {
      tipo_cliente,
      cliente_id,
      equipo,
      nombre_completo,
      dni_ruc,
      estado_civil,
      ocupacion,
      celular,
      direccion,
      distrito,
      provincia,
      departamento,
      // Resto de los campos (venta)
      ...datosVenta
    } = body;

    let clienteQuery: Prisma.ClienteCreateNestedOneWithoutVentasInput;

    if (tipo_cliente === 'existente') {
      clienteQuery = {
        connect: { id: parseInt(cliente_id, 10) }
      };
    } else {
      clienteQuery = {
        create: {
          nombre_completo,
          celular,
          dni_ruc,
          direccion,
          distrito,
          provincia,
          departamento,
          ocupacion,
          estado_civil,
          equipo,
        }
      };
    }

    return this.prisma.venta.create({
      data: {
        lote: datosVenta.lote,
        mz: datosVenta.mz,
        etapa: parseInt(datosVenta.etapa, 10),
        area: parseFloat(datosVenta.area),
        precio_lista: parseFloat(datosVenta.precio_lista),
        descuento: parseFloat(datosVenta.descuento),
        precio_final_dolares: parseFloat(datosVenta.precio_final_dolares),
        precio_final_soles: parseFloat(datosVenta.precio_final_soles),
        tipo_cambio: parseFloat(datosVenta.tipo_cambio),
        tipo_moneda: datosVenta.tipo_moneda,
        modalidad: datosVenta.modalidad,
        porcentaje_inicial: 0,
        numero_cuotas: datosVenta.numero_cuotas ? parseInt(datosVenta.numero_cuotas, 10) : null,
        monto_total_abonado: parseFloat(datosVenta.monto_total_abonado),
        medio_pago: datosVenta.medio_pago,
        banco_emisor: datosVenta.banco_emisor,
        numero_operacion: datosVenta.numero_operacion,
        tipo_comprobante: datosVenta.tipo_comprobante,
        mes_ultimo_deposito: new Date(datosVenta.mes_ultimo_deposito),
        observaciones: datosVenta.observaciones?.trim() || null,
        url_archivo: datosVenta.url_archivo || null,
        asesor: { connect: { id: 1 } },
        cliente: clienteQuery,
      },
    });

  }

  async update(id: number, body: any) {
    const {
      cliente_id,
      ...datosVenta
    } = body;
    return this.prisma.venta.update({
      where: { id },
      data: {
        lote: datosVenta.lote,
        mz: datosVenta.mz,
        etapa: parseInt(datosVenta.etapa, 10),
        area: parseFloat(datosVenta.area),
        precio_lista: parseFloat(datosVenta.precio_lista),
        descuento: parseFloat(datosVenta.descuento),
        precio_final_dolares: parseFloat(datosVenta.precio_final_dolares),
        precio_final_soles: parseFloat(datosVenta.precio_final_soles),
        tipo_cambio: parseFloat(datosVenta.tipo_cambio),
        tipo_moneda: datosVenta.tipo_moneda,
        modalidad: datosVenta.modalidad,
        numero_cuotas: datosVenta.numero_cuotas ? parseInt(datosVenta.numero_cuotas, 10) : null,
        monto_total_abonado: parseFloat(datosVenta.monto_total_abonado),
        medio_pago: datosVenta.medio_pago,
        banco_emisor: datosVenta.banco_emisor,
        numero_operacion: datosVenta.numero_operacion,
        tipo_comprobante: datosVenta.tipo_comprobante,
        mes_ultimo_deposito: new Date(datosVenta.mes_ultimo_deposito),
        observaciones: datosVenta.observaciones?.trim() || null,

        escala: datosVenta.escala ? parseInt(datosVenta.escala, 10) : null,
        porcentaje_inicial: datosVenta.porcentaje_inicial ? parseFloat(datosVenta.porcentaje_inicial) : 0,
        monto_comision: datosVenta.monto_comision ? parseFloat(datosVenta.monto_comision) : null,
        porcentaje_comision: datosVenta.porcentaje_comision ? parseFloat(datosVenta.porcentaje_comision) : null,
        ventas_por_asesor: datosVenta.ventas_por_asesor ? parseInt(datosVenta.ventas_por_asesor, 10) : null,
        fecha_firma_contrato: datosVenta.fecha_firma_contrato ? new Date(datosVenta.fecha_firma_contrato) : null,
        fecha_final_pago: datosVenta.fecha_final_pago ? new Date(datosVenta.fecha_final_pago) : null,

        cliente: { connect: { id: parseInt(cliente_id, 10) } },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.venta.delete({
      where: { id },
    });
  }
}
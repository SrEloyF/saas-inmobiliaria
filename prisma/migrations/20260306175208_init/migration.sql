-- CreateEnum
CREATE TYPE "Equipo" AS ENUM ('Interno', 'Franquiciado', 'Externo');

-- CreateEnum
CREATE TYPE "EstadoCivil" AS ENUM ('Soltero', 'Casado', 'Divorciado', 'Viudo');

-- CreateEnum
CREATE TYPE "MedioPago" AS ENUM ('Transferencia', 'Deposito', 'Cheque_de_gerencia');

-- CreateEnum
CREATE TYPE "Modalidad" AS ENUM ('Financiado', 'Al_contado');

-- CreateEnum
CREATE TYPE "TipoComprobante" AS ENUM ('Boleta', 'Factura');

-- CreateEnum
CREATE TYPE "Moneda" AS ENUM ('Soles', 'Dolares');

-- CreateTable
CREATE TABLE "asesores" (
    "id" SERIAL NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "asesores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "dni_ruc" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "distrito" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "ocupacion" TEXT NOT NULL,
    "estado_civil" "EstadoCivil" NOT NULL,
    "equipo" "Equipo" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ventas" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_asesor" INTEGER NOT NULL,
    "lote" TEXT NOT NULL,
    "mz" TEXT NOT NULL,
    "etapa" INTEGER NOT NULL,
    "escala" INTEGER,
    "area" DECIMAL(10,2) NOT NULL,
    "precio_lista" DECIMAL(12,2) NOT NULL,
    "descuento" DECIMAL(12,2) NOT NULL,
    "precio_final_dolares" DECIMAL(12,2) NOT NULL,
    "precio_final_soles" DECIMAL(12,2) NOT NULL,
    "tipo_cambio" DECIMAL(6,3) NOT NULL,
    "tipo_moneda" "Moneda" NOT NULL,
    "modalidad" "Modalidad" NOT NULL,
    "porcentaje_inicial" DECIMAL(6,2) NOT NULL,
    "numero_cuotas" INTEGER,
    "monto_total_abonado" DECIMAL(12,2) NOT NULL,
    "medio_pago" "MedioPago" NOT NULL,
    "banco_emisor" TEXT NOT NULL,
    "numero_operacion" TEXT NOT NULL,
    "tipo_comprobante" "TipoComprobante" NOT NULL,
    "fecha_firma_contrato" TIMESTAMP(3),
    "fecha_final_pago" TIMESTAMP(3),
    "mes_ultimo_deposito" TIMESTAMP(3) NOT NULL,
    "monto_comision" DECIMAL(12,2),
    "porcentaje_comision" DECIMAL(5,2),
    "ventas_por_asesor" INTEGER,
    "url_archivo" TEXT,
    "observaciones" TEXT,
    "marca_temporal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_id_asesor_fkey" FOREIGN KEY ("id_asesor") REFERENCES "asesores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

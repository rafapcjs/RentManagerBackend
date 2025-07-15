import { Payment } from '../../../domain/entities/Payment';

export class PaymentResponseDto {
  public id: number;
  public contract_id: number;
  public mes: number;
  public anio: number;
  public fecha_pago: string;
  public valor_pagado: number;
  public metodo_pago: string;
  public observacion?: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(payment: Payment) {
    this.id = payment.id!;
    this.contract_id = payment.contract_id;
    this.mes = payment.mes;
    this.anio = payment.anio;
    this.fecha_pago = payment.fecha_pago.toISOString().split('T')[0];
    this.valor_pagado = payment.valor_pagado;
    this.metodo_pago = payment.metodo_pago;
    this.observacion = payment.observacion;
    this.createdAt = (payment as any).createdAt?.toISOString() || new Date().toISOString();
    this.updatedAt = (payment as any).updatedAt?.toISOString() || new Date().toISOString();
  }

  static fromEntity(payment: Payment): PaymentResponseDto {
    return new PaymentResponseDto(payment);
  }

  static fromEntities(payments: Payment[]): PaymentResponseDto[] {
    return payments.map(payment => new PaymentResponseDto(payment));
  }

  getMonthName(): string {
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[this.mes - 1];
  }

  getFormattedAmount(): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(this.valor_pagado);
  }
}

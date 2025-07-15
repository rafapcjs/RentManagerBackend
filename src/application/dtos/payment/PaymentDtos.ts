import { Payment } from '../../../domain/entities/Payment';
import { PaymentMethod } from '../../../domain/constants/PaymentConstants';

// Create Payment DTO
export class CreatePaymentDto {
  constructor(
    public contract_id: number,
    public mes: number,
    public anio: number,
    public fecha_pago: string, // ISO date string
    public valor_pagado: number,
    public metodo_pago: string,
    public observacion?: string
  ) {}

  static fromRequest(body: any): CreatePaymentDto {
    return new CreatePaymentDto(
      parseInt(body.contract_id),
      parseInt(body.mes),
      parseInt(body.anio),
      body.fecha_pago,
      parseFloat(body.valor_pagado),
      body.metodo_pago,
      body.observacion
    );
  }

  validate(): string[] {
    const errors: string[] = [];

    if (!this.contract_id || this.contract_id <= 0) {
      errors.push('Contract ID is required and must be positive');
    }

    if (!this.mes || this.mes < 1 || this.mes > 12) {
      errors.push('Month is required and must be between 1 and 12');
    }

    if (!this.anio || this.anio < 2000 || this.anio > 2100) {
      errors.push('Year is required and must be between 2000 and 2100');
    }

    if (!this.fecha_pago) {
      errors.push('Payment date is required');
    } else {
      const date = new Date(this.fecha_pago);
      if (isNaN(date.getTime())) {
        errors.push('Payment date must be a valid date');
      }
    }

    if (!this.valor_pagado || this.valor_pagado <= 0) {
      errors.push('Payment amount is required and must be greater than 0');
    }

    if (!this.metodo_pago || this.metodo_pago.trim().length === 0) {
      errors.push('Payment method is required');
    }

    if (this.metodo_pago && this.metodo_pago.length > 50) {
      errors.push('Payment method cannot exceed 50 characters');
    }

    if (this.observacion && this.observacion.length > 500) {
      errors.push('Observation cannot exceed 500 characters');
    }

    return errors;
  }

  toDomain(): Payment {
    return new Payment(
      this.contract_id,
      this.mes,
      this.anio,
      new Date(this.fecha_pago),
      this.valor_pagado,
      this.metodo_pago,
      this.observacion
    );
  }
}

// Update Payment DTO
export class UpdatePaymentDto {
  constructor(
    public contract_id?: number,
    public mes?: number,
    public anio?: number,
    public fecha_pago?: string,
    public valor_pagado?: number,
    public metodo_pago?: string,
    public observacion?: string
  ) {}

  static fromRequest(body: any): UpdatePaymentDto {
    return new UpdatePaymentDto(
      body.contract_id ? parseInt(body.contract_id) : undefined,
      body.mes ? parseInt(body.mes) : undefined,
      body.anio ? parseInt(body.anio) : undefined,
      body.fecha_pago,
      body.valor_pagado ? parseFloat(body.valor_pagado) : undefined,
      body.metodo_pago,
      body.observacion
    );
  }

  validate(): string[] {
    const errors: string[] = [];

    if (this.contract_id !== undefined && this.contract_id <= 0) {
      errors.push('Contract ID must be positive');
    }

    if (this.mes !== undefined && (this.mes < 1 || this.mes > 12)) {
      errors.push('Month must be between 1 and 12');
    }

    if (this.anio !== undefined && (this.anio < 2000 || this.anio > 2100)) {
      errors.push('Year must be between 2000 and 2100');
    }

    if (this.fecha_pago !== undefined) {
      const date = new Date(this.fecha_pago);
      if (isNaN(date.getTime())) {
        errors.push('Payment date must be a valid date');
      }
    }

    if (this.valor_pagado !== undefined && this.valor_pagado <= 0) {
      errors.push('Payment amount must be greater than 0');
    }

    if (this.metodo_pago !== undefined && this.metodo_pago.trim().length === 0) {
      errors.push('Payment method cannot be empty');
    }

    if (this.metodo_pago !== undefined && this.metodo_pago.length > 50) {
      errors.push('Payment method cannot exceed 50 characters');
    }

    if (this.observacion !== undefined && this.observacion.length > 500) {
      errors.push('Observation cannot exceed 500 characters');
    }

    return errors;
  }

  toDomain(): Partial<Payment> {
    const domain: any = {};
    
    if (this.contract_id !== undefined) domain.contract_id = this.contract_id;
    if (this.mes !== undefined) domain.mes = this.mes;
    if (this.anio !== undefined) domain.anio = this.anio;
    if (this.fecha_pago !== undefined) domain.fecha_pago = new Date(this.fecha_pago);
    if (this.valor_pagado !== undefined) domain.valor_pagado = this.valor_pagado;
    if (this.metodo_pago !== undefined) domain.metodo_pago = this.metodo_pago;
    if (this.observacion !== undefined) domain.observacion = this.observacion;

    return domain;
  }
}

// Payment Query DTO
export class PaymentQueryDto {
  constructor(
    public contractId?: number,
    public mes?: number,
    public anio?: number,
    public metodo_pago?: string,
    public page: number = 1,
    public limit: number = 10
  ) {}

  static fromQuery(query: any): PaymentQueryDto {
    return new PaymentQueryDto(
      query.contractId ? parseInt(query.contractId) : undefined,
      query.mes ? parseInt(query.mes) : undefined,
      query.anio ? parseInt(query.anio) : undefined,
      query.metodo_pago,
      query.page ? parseInt(query.page) : 1,
      query.limit ? parseInt(query.limit) : 10
    );
  }
}

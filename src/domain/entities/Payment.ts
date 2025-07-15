export class Payment {
  public id?: number;
  public readonly contract_id: number;
  public readonly mes: number;
  public readonly anio: number;
  public readonly fecha_pago: Date;
  public readonly valor_pagado: number;
  public readonly metodo_pago: string;
  public readonly observacion?: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(
    contract_id: number,
    mes: number,
    anio: number,
    fecha_pago: Date,
    valor_pagado: number,
    metodo_pago: string,
    observacion?: string
  ) {
    this.contract_id = contract_id;
    this.mes = mes;
    this.anio = anio;
    this.fecha_pago = fecha_pago;
    this.valor_pagado = valor_pagado;
    this.metodo_pago = metodo_pago;
    this.observacion = observacion;

    this.validate();
  }

  private validate(): void {
    const errors: string[] = [];

    if (this.contract_id <= 0) {
      errors.push('Contract ID must be a positive number');
    }

    if (this.mes < 1 || this.mes > 12) {
      errors.push('Month must be between 1 and 12');
    }

    if (this.anio < 2000 || this.anio > 2100) {
      errors.push('Year must be between 2000 and 2100');
    }

    if (this.valor_pagado <= 0) {
      errors.push('Payment amount must be greater than 0');
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

    if (errors.length > 0) {
      throw new Error(`Payment validation errors: ${errors.join(', ')}`);
    }
  }

  public validatePaymentDate(): string[] {
    const errors: string[] = [];
    const currentDate = new Date();
    
    if (this.fecha_pago > currentDate) {
      errors.push('Payment date cannot be in the future');
    }

    return errors;
  }

  public getMonthYear(): string {
    return `${this.mes.toString().padStart(2, '0')}/${this.anio}`;
  }

  public isCurrentMonth(): boolean {
    const now = new Date();
    return this.mes === (now.getMonth() + 1) && this.anio === now.getFullYear();
  }
}

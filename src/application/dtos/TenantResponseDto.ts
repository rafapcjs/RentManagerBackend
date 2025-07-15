export class TenantResponseDto {
  id?: number;
  dni: string;
  fullName: string;
  numberPhone: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: any) {
    this.id = data.id;
    this.dni = data.dni;
    this.fullName = data.fullName;
    this.numberPhone = data.numberPhone;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Método estático para crear desde entidad de dominio
  static fromDomain(tenant: any): TenantResponseDto {
    return new TenantResponseDto({
      id: tenant.id,
      dni: tenant.dni,
      fullName: tenant.fullName,
      numberPhone: tenant.numberPhone,
      createdAt: tenant.createdAt,
      updatedAt: tenant.updatedAt
    });
  }

  // Convertir a objeto plano para JSON
  toJSON(): any {
    return {
      id: this.id,
      dni: this.dni,
      fullName: this.fullName,
      numberPhone: this.numberPhone,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

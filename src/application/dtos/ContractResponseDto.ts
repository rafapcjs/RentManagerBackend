// DTO for contract response
export class ContractResponseDto {
  id!: number;
  dni!: string;
  propertyId!: number;
  startDate!: string;
  endDate!: string;
  monthlyValue!: number;
  active!: boolean;
  images!: string[];
  createdAt!: string;
  updatedAt!: string;
  tenant?: {
    dni: string;
    name: string;
    email: string;
    phone: string;
  };
  property?: {
    id: number;
    address: string;
    type: string;
    rentalValue: number;
    status: string;
  };

  constructor(data: any) {
    this.id = data.id;
    this.dni = data.dni;
    this.propertyId = data.property_id || data.propertyId;
    this.startDate = data.start_date?.toISOString ? data.start_date.toISOString().split('T')[0] : data.startDate;
    this.endDate = data.end_date?.toISOString ? data.end_date.toISOString().split('T')[0] : data.endDate;
    this.monthlyValue = data.monthly_value || data.monthlyValue;
    this.active = data.active;
    this.images = data.images || [];
    this.createdAt = data.createdAt?.toISOString ? data.createdAt.toISOString() : data.createdAt || '';
    this.updatedAt = data.updatedAt?.toISOString ? data.updatedAt.toISOString() : data.updatedAt || '';

    if (data.tenant) {
      this.tenant = {
        dni: data.tenant.dni,
        name: data.tenant.name || data.tenant.nombre || data.tenant.fullName,
        email: data.tenant.email,
        phone: data.tenant.phone || data.tenant.telefono || data.tenant.numberPhone
      };
    }

    if (data.property) {
      this.property = {
        id: data.property.id,
        address: data.property.address || data.property.direccion,
        type: data.property.type || data.property.tipo,
        rentalValue: data.property.rental_value || data.property.rentalValue || data.property.valor_arriendo,
        status: data.property.status || data.property.estado
      };
    }
  }

  // Factory method to create from domain entity
  static fromDomain(contract: any): ContractResponseDto {
    return new ContractResponseDto(contract);
  }

  // Factory method to create array from domain entities
  static fromDomainArray(contracts: any[]): ContractResponseDto[] {
    return contracts.map(contract => ContractResponseDto.fromDomain(contract));
  }
}

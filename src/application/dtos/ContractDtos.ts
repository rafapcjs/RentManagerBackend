// DTO for creating a new contract
export class CreateContractDto {
  dni!: string;
  propertyId!: number;
  startDate!: string; // ISO date string
  endDate!: string; // ISO date string
  monthlyValue!: number;
  active?: boolean;
  images?: string[];

  constructor(data: any) {
    this.dni = data.dni?.trim();
    this.propertyId = data.property_id || data.propertyId;
    this.startDate = data.start_date || data.startDate;
    this.endDate = data.end_date || data.endDate;
    this.monthlyValue = data.monthly_value || data.monthlyValue;
    this.active = data.active !== undefined ? data.active : true;
    this.images = data.images || [];
  }

  // Factory method to create from HTTP request
  static fromRequest(data: any): CreateContractDto {
    const dto = new CreateContractDto(data);
    const errors = dto.validate();
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    
    return dto;
  }

  // Validation method
  validate(): string[] {
    const errors: string[] = [];

    if (!this.dni || this.dni.trim() === '') {
      errors.push('DNI is required');
    }

    if (!this.propertyId || this.propertyId <= 0) {
      errors.push('Property ID is required and must be positive');
    }

    if (!this.startDate) {
      errors.push('Start date is required');
    } else {
      const startDate = new Date(this.startDate);
      if (isNaN(startDate.getTime())) {
        errors.push('Start date must be a valid date');
      }
    }

    if (!this.endDate) {
      errors.push('End date is required');
    } else {
      const endDate = new Date(this.endDate);
      if (isNaN(endDate.getTime())) {
        errors.push('End date must be a valid date');
      }
    }

    if (this.startDate && this.endDate) {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      if (startDate >= endDate) {
        errors.push('Start date must be before end date');
      }
    }

    if (!this.monthlyValue || this.monthlyValue <= 0) {
      errors.push('Monthly value is required and must be positive');
    }

    if (this.images && this.images.length > 10) {
      errors.push('Maximum 10 images allowed');
    }

    return errors;
  }

  // Convert to domain model data
  toDomain(): any {
    return {
      dni: this.dni,
      property_id: this.propertyId,
      start_date: new Date(this.startDate),
      end_date: new Date(this.endDate),
      monthly_value: this.monthlyValue,
      active: this.active,
      images: this.images
    };
  }
}

// DTO for updating an existing contract
export class UpdateContractDto {
  startDate?: string;
  endDate?: string;
  monthlyValue?: number;
  active?: boolean;
  images?: string[];

  constructor(data: any) {
    this.startDate = data.start_date || data.startDate;
    this.endDate = data.end_date || data.endDate;
    this.monthlyValue = data.monthly_value || data.monthlyValue;
    this.active = data.active;
    this.images = data.images;
  }

  // Factory method to create from HTTP request
  static fromRequest(data: any): UpdateContractDto {
    const dto = new UpdateContractDto(data);
    const errors = dto.validate();
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    
    return dto;
  }

  // Validation method
  validate(): string[] {
    const errors: string[] = [];

    if (this.startDate !== undefined) {
      const startDate = new Date(this.startDate);
      if (isNaN(startDate.getTime())) {
        errors.push('Start date must be a valid date');
      }
    }

    if (this.endDate !== undefined) {
      const endDate = new Date(this.endDate);
      if (isNaN(endDate.getTime())) {
        errors.push('End date must be a valid date');
      }
    }

    if (this.startDate && this.endDate) {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      if (startDate >= endDate) {
        errors.push('Start date must be before end date');
      }
    }

    if (this.monthlyValue !== undefined && this.monthlyValue <= 0) {
      errors.push('Monthly value must be positive');
    }

    if (this.images && this.images.length > 10) {
      errors.push('Maximum 10 images allowed');
    }

    return errors;
  }

  // Convert to domain model data
  toDomain(): any {
    const data: any = {};
    
    if (this.startDate !== undefined) {
      data.start_date = new Date(this.startDate);
    }
    if (this.endDate !== undefined) {
      data.end_date = new Date(this.endDate);
    }
    if (this.monthlyValue !== undefined) {
      data.monthly_value = this.monthlyValue;
    }
    if (this.active !== undefined) {
      data.active = this.active;
    }
    if (this.images !== undefined) {
      data.images = this.images;
    }

    return data;
  }
}

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

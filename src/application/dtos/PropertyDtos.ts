import { PropertyType, PropertyStatus } from "../../domain/constants/PropertyConstants";

// DTO for creating a new property
export class CreatePropertyDto {
  address!: string;
  type!: PropertyType;
  rentalValue!: number;
  status?: PropertyStatus;
  description?: string;
  waterCode?: string;
  electricityCode?: string;
  gasCode?: string;

  constructor(data: any) {
    this.address = (data.address || data.direccion)?.trim();
    this.type = data.type || data.tipo;
    this.rentalValue = parseFloat(data.rentalValue || data.valor_arriendo);
    this.status = data.status || data.estado || PropertyStatus.DISPONIBLE;
    this.description = (data.description || data.descripcion)?.trim();
    this.waterCode = (data.waterCode || data.codigo_agua)?.trim();
    this.electricityCode = (data.electricityCode || data.codigo_luz)?.trim();
    this.gasCode = (data.gasCode || data.codigo_gas)?.trim();
  }

  // Factory method to create from HTTP request
  static fromRequest(data: any): CreatePropertyDto {
    const dto = new CreatePropertyDto(data);
    const errors = dto.validate();
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    
    return dto;
  }

  // Validations
  validate(): string[] {
    const errors: string[] = [];

    if (!this.address || this.address.length < 5) {
      errors.push('Address is required and must be at least 5 characters long');
    }

    if (this.address && this.address.length > 255) {
      errors.push('Address must not exceed 255 characters');
    }

    if (!Object.values(PropertyType).includes(this.type)) {
      errors.push('Property type must be either "casa" or "apartamento"');
    }

    if (!this.rentalValue || this.rentalValue <= 0) {
      errors.push('Rental value is required and must be greater than 0');
    }

    if (this.rentalValue && this.rentalValue > 999999999) {
      errors.push('Rental value must not exceed 999,999,999');
    }

    if (!Object.values(PropertyStatus).includes(this.status!)) {
      errors.push('Property status must be either "disponible", "arrendada", or "mantenimiento"');
    }

    if (this.description && this.description.length > 1000) {
      errors.push('Description must not exceed 1000 characters');
    }

    return errors;
  }

  // Method to convert to domain object
  toDomain() {
    return {
      direccion: this.address,
      tipo: this.type,
      valor_arriendo: this.rentalValue,
      estado: this.status,
      descripcion: this.description,
      codigo_agua: this.waterCode,
      codigo_luz: this.electricityCode,
      codigo_gas: this.gasCode
    };
  }
}

// DTO for updating an existing property
export class UpdatePropertyDto {
  address?: string;
  type?: PropertyType;
  rentalValue?: number;
  status?: PropertyStatus;
  description?: string;
  waterCode?: string;
  electricityCode?: string;
  gasCode?: string;

  constructor(data: any) {
    this.address = (data.address || data.direccion)?.trim();
    this.type = data.type || data.tipo;
    this.rentalValue = data.rentalValue || data.valor_arriendo ? parseFloat(data.rentalValue || data.valor_arriendo) : undefined;
    this.status = data.status || data.estado;
    this.description = (data.description || data.descripcion)?.trim();
    this.waterCode = (data.waterCode || data.codigo_agua)?.trim();
    this.electricityCode = (data.electricityCode || data.codigo_luz)?.trim();
    this.gasCode = (data.gasCode || data.codigo_gas)?.trim();
  }

  // Factory method to create from HTTP request
  static fromRequest(data: any): UpdatePropertyDto {
    const dto = new UpdatePropertyDto(data);
    const errors = dto.validate();
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    
    return dto;
  }

  // Validations
  validate(): string[] {
    const errors: string[] = [];

    if (this.address !== undefined) {
      if (!this.address || this.address.length < 5) {
        errors.push('Address must be at least 5 characters long');
      }
      if (this.address.length > 255) {
        errors.push('Address must not exceed 255 characters');
      }
    }

    if (this.type !== undefined && !Object.values(PropertyType).includes(this.type)) {
      errors.push('Property type must be either "casa" or "apartamento"');
    }

    if (this.rentalValue !== undefined) {
      if (this.rentalValue <= 0) {
        errors.push('Rental value must be greater than 0');
      }
      if (this.rentalValue > 999999999) {
        errors.push('Rental value must not exceed 999,999,999');
      }
    }

    if (this.status !== undefined && !Object.values(PropertyStatus).includes(this.status)) {
      errors.push('Property status must be either "disponible", "arrendada", or "mantenimiento"');
    }

    if (this.description !== undefined && this.description.length > 1000) {
      errors.push('Description must not exceed 1000 characters');
    }

    return errors;
  }

  // Method to convert to domain object
  toDomain() {
    const data: any = {};
    if (this.address !== undefined) data.direccion = this.address;
    if (this.type !== undefined) data.tipo = this.type;
    if (this.rentalValue !== undefined) data.valor_arriendo = this.rentalValue;
    if (this.status !== undefined) data.estado = this.status;
    if (this.description !== undefined) data.descripcion = this.description;
    if (this.waterCode !== undefined) data.codigo_agua = this.waterCode;
    if (this.electricityCode !== undefined) data.codigo_luz = this.electricityCode;
    if (this.gasCode !== undefined) data.codigo_gas = this.gasCode;
    return data;
  }
}

// DTO for property response
export class PropertyResponseDto {
  id!: number;
  address!: string;
  type!: PropertyType;
  rentalValue!: number;
  status!: PropertyStatus;
  description!: string;
  waterCode!: string;
  electricityCode!: string;
  gasCode!: string;
  createdAt!: string;
  updatedAt!: string;

  constructor(data: any) {
    this.id = data.id;
    this.address = data.address || data.direccion;
    this.type = data.type || data.tipo;
    this.rentalValue = data.rentalValue || data.valor_arriendo;
    this.status = data.status || data.estado;
    this.description = data.description || data.descripcion || '';
    this.waterCode = data.waterCode || data.codigo_agua || '';
    this.electricityCode = data.electricityCode || data.codigo_luz || '';
    this.gasCode = data.gasCode || data.codigo_gas || '';
    this.createdAt = data.createdAt?.toISOString ? data.createdAt.toISOString() : data.createdAt || '';
    this.updatedAt = data.updatedAt?.toISOString ? data.updatedAt.toISOString() : data.updatedAt || '';
  }

  // Factory method to create from domain entity
  static fromDomain(property: any): PropertyResponseDto {
    return new PropertyResponseDto(property);
  }

  // Factory method to create array from domain entities
  static fromDomainArray(properties: any[]): PropertyResponseDto[] {
    return properties.map(property => PropertyResponseDto.fromDomain(property));
  }

  // Convert to JSON object
  toJSON() {
    return {
      id: this.id,
      address: this.address,
      type: this.type,
      rentalValue: this.rentalValue,
      status: this.status,
      description: this.description,
      waterCode: this.waterCode,
      electricityCode: this.electricityCode,
      gasCode: this.gasCode,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

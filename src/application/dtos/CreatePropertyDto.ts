import { PropertyType, PropertyStatus } from "../../domain/constants/PropertyConstants";

export class CreatePropertyDto {
  direccion!: string;
  tipo!: PropertyType;
  valor_arriendo!: number;
  estado?: PropertyStatus;
  descripcion?: string;
  codigo_agua?: string;
  codigo_luz?: string;
  codigo_gas?: string;

  constructor(data: any) {
    this.direccion = data.direccion?.trim();
    this.tipo = data.tipo;
    this.valor_arriendo = parseFloat(data.valor_arriendo);
    this.estado = data.estado || PropertyStatus.DISPONIBLE;
    this.descripcion = data.descripcion?.trim();
    this.codigo_agua = data.codigo_agua?.trim();
    this.codigo_luz = data.codigo_luz?.trim();
    this.codigo_gas = data.codigo_gas?.trim();
  }

  // Factory method para crear desde request HTTP
  static fromRequest(data: any): CreatePropertyDto {
    const dto = new CreatePropertyDto(data);
    const errors = dto.validate();
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    
    return dto;
  }

  // Validaciones
  validate(): string[] {
    const errors: string[] = [];

    if (!this.direccion || this.direccion.length < 5) {
      errors.push('Address is required and must be at least 5 characters long');
    }

    if (this.direccion && this.direccion.length > 255) {
      errors.push('Address must not exceed 255 characters');
    }

    if (!Object.values(PropertyType).includes(this.tipo)) {
      errors.push('Property type must be either "casa" or "apartamento"');
    }

    if (!this.valor_arriendo || this.valor_arriendo <= 0) {
      errors.push('Rent value is required and must be greater than 0');
    }

    if (this.valor_arriendo && this.valor_arriendo > 999999999.99) {
      errors.push('Rent value is too large');
    }

    if (this.estado && !Object.values(PropertyStatus).includes(this.estado)) {
      errors.push('Status must be either "disponible" or "arrendada"');
    }

    if (this.descripcion && this.descripcion.length > 1000) {
      errors.push('Description must not exceed 1000 characters');
    }

    // Validaciones para códigos de servicios (opcionales)
    if (this.codigo_agua && (this.codigo_agua.length < 3 || this.codigo_agua.length > 50)) {
      errors.push('Water service code must be between 3 and 50 characters');
    }

    if (this.codigo_luz && (this.codigo_luz.length < 3 || this.codigo_luz.length > 50)) {
      errors.push('Electricity service code must be between 3 and 50 characters');
    }

    if (this.codigo_gas && (this.codigo_gas.length < 3 || this.codigo_gas.length > 50)) {
      errors.push('Gas service code must be between 3 and 50 characters');
    }

    return errors;
  }

  // Método para convertir a objeto plano para el dominio
  toDomain() {
    return {
      direccion: this.direccion,
      tipo: this.tipo,
      valor_arriendo: this.valor_arriendo,
      estado: this.estado,
      descripcion: this.descripcion,
      codigo_agua: this.codigo_agua,
      codigo_luz: this.codigo_luz,
      codigo_gas: this.codigo_gas
    };
  }
}

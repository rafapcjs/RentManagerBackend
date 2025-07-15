import { PropertyType, PropertyStatus } from "../../domain/constants/PropertyConstants";

export class PropertyResponseDto {
  id?: number;
  direccion: string;
  tipo: PropertyType;
  valor_arriendo: number;
  estado: PropertyStatus;
  descripcion?: string;
  codigo_agua?: string;
  codigo_luz?: string;
  codigo_gas?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: any) {
    this.id = data.id;
    this.direccion = data.direccion;
    this.tipo = data.tipo;
    this.valor_arriendo = data.valor_arriendo;
    this.estado = data.estado;
    this.descripcion = data.descripcion;
    this.codigo_agua = data.codigo_agua;
    this.codigo_luz = data.codigo_luz;
    this.codigo_gas = data.codigo_gas;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Método estático para crear desde entidad de dominio
  static fromDomain(property: any): PropertyResponseDto {
    return new PropertyResponseDto({
      direccion: property.direccion,
      tipo: property.tipo,
      valor_arriendo: property.valor_arriendo,
      estado: property.estado,
      descripcion: property.descripcion,
      codigo_agua: property.codigo_agua,
      codigo_luz: property.codigo_luz,
      codigo_gas: property.codigo_gas
    });
  }

  // Convertir a objeto plano para JSON
  toJSON(): any {
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

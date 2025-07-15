import { PropertyType, PropertyStatus } from '../constants/PropertyConstants';

export { PropertyType, PropertyStatus } from '../constants/PropertyConstants';

export class Property {
  constructor(
    public direccion: string,
    public tipo: PropertyType,
    public valor_arriendo: number,
    public estado: PropertyStatus = PropertyStatus.DISPONIBLE,
    public descripcion?: string,
    public codigo_agua?: string,
    public codigo_luz?: string,
    public codigo_gas?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public id?: number
  ) {}

  // Método estático para crear desde DTO
  static fromCreateDto(dto: any): Property {
    return new Property(
      dto.direccion,
      dto.tipo,
      dto.valor_arriendo,
      dto.estado || PropertyStatus.DISPONIBLE,
      dto.descripcion,
      dto.codigo_agua,
      dto.codigo_luz,
      dto.codigo_gas,
      new Date(),
      new Date()
    );
  }

  // Método para actualizar desde DTO
  updateFromDto(dto: any): void {
    if (dto.direccion !== undefined) {
      this.direccion = dto.direccion;
    }
    if (dto.tipo !== undefined) {
      this.tipo = dto.tipo;
    }
    if (dto.valor_arriendo !== undefined) {
      this.valor_arriendo = dto.valor_arriendo;
    }
    if (dto.estado !== undefined) {
      this.estado = dto.estado;
    }
    if (dto.descripcion !== undefined) {
      this.descripcion = dto.descripcion;
    }
    if (dto.codigo_agua !== undefined) {
      this.codigo_agua = dto.codigo_agua;
    }
    if (dto.codigo_luz !== undefined) {
      this.codigo_luz = dto.codigo_luz;
    }
    if (dto.codigo_gas !== undefined) {
      this.codigo_gas = dto.codigo_gas;
    }
    this.updatedAt = new Date();
  }
}

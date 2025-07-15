import { IPropertyRepository } from '../../../interfaces/repositories/IPropertyRepository';
import { Property } from '../../entities/Property';
import { CreatePropertyDto } from '../../../application/dtos';

export class CreateProperty {
  constructor(private repo: IPropertyRepository) {}

  async execute(createDto: CreatePropertyDto): Promise<Property> {
    // Las validaciones ya se realizan en el DTO
    // Crear entidad de dominio desde el DTO
    const property = Property.fromCreateDto(createDto);
    
    return this.repo.create(property);
  }
}

import { ITentantRepository } from '../../../interfaces/repositories/ITentantRepository';
import { Tenant } from '../../entities/Tenant';
import { UpdateTenantDto } from '../../../application/dtos';

export class UpdateTenant {
  constructor(private repo: ITentantRepository) {}

  async execute(dni: string, updateDto: UpdateTenantDto): Promise<Tenant> {
    if (!dni || dni.trim() === '') {
      throw new Error('DNI is required');
    }

    // Verificar que el tenant existe
    const existingTenant = await this.repo.getByDni(dni);
    if (!existingTenant) {
      throw new Error(`Tenant with DNI ${dni} not found`);
    }

    // Las validaciones ya se realizan en el DTO
    // Actualizar la entidad existente con los datos del DTO
    existingTenant.updateFromDto(updateDto);

    const updatedTenant = await this.repo.update(dni, existingTenant);
    
    if (!updatedTenant) {
      throw new Error(`Failed to update tenant with DNI ${dni}`);
    }

    return updatedTenant;
  }
}

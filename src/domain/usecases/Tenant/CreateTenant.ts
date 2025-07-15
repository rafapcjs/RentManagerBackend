import { ITenantRepository } from '../../../interfaces/repositories/ITenantRepository';
import { Tenant } from '../../entities/Tenant';
import { CreateTenantDto } from '../../../application/dtos';

export class CreateTenant {
  constructor(private repo: ITenantRepository) {}

  async execute(createDto: CreateTenantDto): Promise<Tenant> {
    // Las validaciones ya se realizan en el DTO
    // Verificar que no exista un tenant con el mismo DNI
    const existingTenant = await this.repo.getByDni(createDto.dni);
    if (existingTenant) {
      throw new Error(`Tenant with DNI ${createDto.dni} already exists`);
    }

    // Crear entidad de dominio desde el DTO
    const tenant = Tenant.fromCreateDto(createDto);
    
    return this.repo.create(tenant);
  }
}


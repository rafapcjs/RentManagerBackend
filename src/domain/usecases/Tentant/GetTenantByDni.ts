import { ITentantRepository } from '../../../interfaces/repositories/ITentantRepository';
import { Tenant } from '../../entities/Tenant';

export class GetTenantByDni {
  constructor(private repo: ITentantRepository) {}

  async execute(dni: string): Promise<Tenant | null> {
    if (!dni || dni.trim() === '') {
      throw new Error('DNI is required');
    }
    
    return this.repo.getByDni(dni);
  }
}

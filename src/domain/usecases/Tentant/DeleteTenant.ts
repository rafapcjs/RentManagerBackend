import { ITentantRepository } from '../../../interfaces/repositories/ITentantRepository';

export class DeleteTenant {
  constructor(private repo: ITentantRepository) {}

  async execute(dni: string): Promise<void> {
    if (!dni || dni.trim() === '') {
      throw new Error('DNI is required');
    }

    // Verificar que el tenant existe antes de eliminarlo
    const existingTenant = await this.repo.getByDni(dni);
    if (!existingTenant) {
      throw new Error(`Tenant with DNI ${dni} not found`);
    }

    await this.repo.delete(dni);
  }
}

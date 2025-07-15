import { IPropertyRepository } from '../../../interfaces/repositories/IPropertyRepository';

export class DeleteProperty {
  constructor(private repo: IPropertyRepository) {}

  async execute(id: number): Promise<void> {
    if (!id || id <= 0) {
      throw new Error('Property ID is required and must be a positive number');
    }

    // Verificar que la propiedad existe
    const existingProperty = await this.repo.getById(id);
    if (!existingProperty) {
      throw new Error(`Property with ID ${id} not found`);
    }

    await this.repo.delete(id);
  }
}

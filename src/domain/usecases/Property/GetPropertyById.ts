import { IPropertyRepository } from '../../../interfaces/repositories/IPropertyRepository';
import { Property } from '../../entities/Property';

export class GetPropertyById {
  constructor(private repo: IPropertyRepository) {}

  async execute(id: number): Promise<Property | null> {
    if (!id || id <= 0) {
      throw new Error('Property ID is required and must be a positive number');
    }

    return this.repo.getById(id);
  }
}

import { IPropertyRepository } from '../../../interfaces/repositories/IPropertyRepository';
import { Property } from '../../entities/Property';
import { PaginationOptions, PaginatedResult } from '../../../interfaces/common/Pagination';

export class GetAllProperties {
  constructor(private repo: IPropertyRepository) {}

  async execute(options?: PaginationOptions): Promise<PaginatedResult<Property>> {
    return this.repo.getAll(options);
  }
}

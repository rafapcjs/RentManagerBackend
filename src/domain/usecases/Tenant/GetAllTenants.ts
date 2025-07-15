import { ITenantRepository } from '../../../interfaces/repositories/ITenantRepository';
import { PaginationOptions, PaginatedResult } from '../../../interfaces/common/Pagination';
import { Tenant } from '../../entities/Tenant';

export class GetAllTenants {
  constructor(private repo: ITenantRepository) {}

  async execute(options?: PaginationOptions): Promise<PaginatedResult<Tenant>> {
    // Validaciones
    if (options?.page && options.page < 1) {
      throw new Error('Page number must be greater than 0');
    }
    
    if (options?.limit && (options.limit < 1 || options.limit > 100)) {
      throw new Error('Limit must be between 1 and 100');
    }
    
    return this.repo.getAll(options);
  }
}

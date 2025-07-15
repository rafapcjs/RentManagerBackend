import { Contract } from '../../entities/Contract';
import { IContractRepository } from '../../../interfaces/repositories/IContractRepository';
import { PaginationOptions } from '../../../interfaces/common/Pagination';

export class GetAllContracts {
  constructor(private contractRepository: IContractRepository) {}

  async execute(page: number = 1, limit: number = 10): Promise<{
    contracts: Contract[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const options: PaginationOptions = { page, limit };
    const result = await this.contractRepository.getAll(options);
    
    return {
      contracts: result.data,
      total: result.pagination.totalItems,
      page: result.pagination.currentPage,
      totalPages: result.pagination.totalPages
    };
  }
}

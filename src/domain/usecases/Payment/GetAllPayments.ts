import { Payment } from '../../entities/Payment';
import { IPaymentRepository } from '../../../interfaces/repositories/IPaymentRepository';
import { PaginationOptions } from '../../../interfaces/common/Pagination';

export class GetAllPayments {
  constructor(private paymentRepository: IPaymentRepository) {}

  async execute(page: number = 1, limit: number = 10): Promise<{
    payments: Payment[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const options: PaginationOptions = { page, limit };
    const result = await this.paymentRepository.getAll(options);
    
    return {
      payments: result.data,
      total: result.pagination.totalItems,
      page: result.pagination.currentPage,
      totalPages: result.pagination.totalPages
    };
  }
}

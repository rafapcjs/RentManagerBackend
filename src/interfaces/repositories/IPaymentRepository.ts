import { Payment } from '../../domain/entities/Payment';
import { PaginationOptions, PaginatedResult } from '../common/Pagination';

export interface IPaymentRepository {
  getAll(options?: PaginationOptions): Promise<PaginatedResult<Payment>>;
  getById(id: number): Promise<Payment | null>;
  create(payment: Payment): Promise<Payment>;
  update(id: number, payment: Payment): Promise<Payment | null>;
  delete(id: number): Promise<void>;
  
  // Payment-specific methods
  getPaymentsByContract(contractId: number): Promise<Payment[]>;
  getPaymentsByMonth(mes: number, anio: number): Promise<Payment[]>;
  getPaymentsSummaryPending(mes?: number, anio?: number): Promise<{
    totalPending: number;
    totalPaid: number;
    contractsPending: number;
    contractsPaid: number;
  }>;
  getPaymentsByContractAndMonth(contractId: number, mes: number, anio: number): Promise<Payment[]>;
}

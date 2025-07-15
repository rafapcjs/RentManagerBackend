import { Payment } from '../../entities/Payment';
import { IPaymentRepository } from '../../../interfaces/repositories/IPaymentRepository';

export class GetPaymentsByContract {
  constructor(private paymentRepository: IPaymentRepository) {}

  async execute(contractId: number): Promise<Payment[]> {
    if (contractId <= 0) {
      throw new Error('Contract ID must be a positive number');
    }

    return await this.paymentRepository.getPaymentsByContract(contractId);
  }
}

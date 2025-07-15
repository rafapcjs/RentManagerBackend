import { Payment } from '../../entities/Payment';
import { IPaymentRepository } from '../../../interfaces/repositories/IPaymentRepository';

export class GetPaymentById {
  constructor(private paymentRepository: IPaymentRepository) {}

  async execute(id: number): Promise<Payment | null> {
    return await this.paymentRepository.getById(id);
  }
}

import { Payment } from '../../entities/Payment';
import { IPaymentRepository } from '../../../interfaces/repositories/IPaymentRepository';

export class GetPaymentsByMonth {
  constructor(private paymentRepository: IPaymentRepository) {}

  async execute(mes?: number, anio?: number): Promise<Payment[]> {
    const currentDate = new Date();
    const targetMonth = mes || (currentDate.getMonth() + 1);
    const targetYear = anio || currentDate.getFullYear();

    if (targetMonth < 1 || targetMonth > 12) {
      throw new Error('Month must be between 1 and 12');
    }

    if (targetYear < 2000 || targetYear > 2100) {
      throw new Error('Year must be between 2000 and 2100');
    }

    return await this.paymentRepository.getPaymentsByMonth(targetMonth, targetYear);
  }
}

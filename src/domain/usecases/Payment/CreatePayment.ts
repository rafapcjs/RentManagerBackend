import { Payment } from '../../entities/Payment';
import { IPaymentRepository } from '../../../interfaces/repositories/IPaymentRepository';
import { IContractRepository } from '../../../interfaces/repositories/IContractRepository';
import { CreatePaymentDto } from '../../../application/dtos';

export class CreatePayment {
  constructor(
    private paymentRepository: IPaymentRepository,
    private contractRepository: IContractRepository
  ) {}

  async execute(dto: CreatePaymentDto): Promise<Payment> {
    const errors = dto.validate();
    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(', ')}`);
    }

    // Verify contract exists and is active
    const contract = await this.contractRepository.getById(dto.contract_id);
    if (!contract) {
      throw new Error('Contract not found');
    }

    if (!contract.active) {
      throw new Error('Cannot create payment for inactive contract');
    }

    const payment = dto.toDomain();
    
    const dateErrors = payment.validatePaymentDate();
    if (dateErrors.length > 0) {
      throw new Error(`Date validation errors: ${dateErrors.join(', ')}`);
    }

    return await this.paymentRepository.create(payment);
  }
}

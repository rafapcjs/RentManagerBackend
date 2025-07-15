import { Repository } from 'typeorm';
import { Payment } from '../../domain/entities/Payment';
import { IPaymentRepository } from '../../interfaces/repositories/IPaymentRepository';
import { PaymentORM } from '../typeorm/PaymentORM';
import { AppDataSource } from '../../config/data-source';
import { PaginationOptions, PaginatedResult } from '../../interfaces/common/Pagination';

export class PaymentRepository implements IPaymentRepository {
  private repository: Repository<PaymentORM>;

  constructor() {
    this.repository = AppDataSource.getRepository(PaymentORM);
  }

  async create(payment: Payment): Promise<Payment> {
    const paymentORM = new PaymentORM();
    paymentORM.contract_id = payment.contract_id;
    paymentORM.mes = payment.mes;
    paymentORM.anio = payment.anio;
    paymentORM.fecha_pago = payment.fecha_pago;
    paymentORM.valor_pagado = payment.valor_pagado;
    paymentORM.metodo_pago = payment.metodo_pago;
    paymentORM.observacion = payment.observacion || '';
    paymentORM.createdAt = new Date();
    paymentORM.updatedAt = new Date();

    const savedPayment = await this.repository.save(paymentORM);
    return this.mapToEntity(savedPayment);
  }

  // Standard repository methods (for consistency)
  async getAll(options?: PaginationOptions): Promise<PaginatedResult<Payment>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    
    const [paymentsORM, total] = await this.repository.findAndCount({
      relations: ['contract'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit
    });

    const payments = paymentsORM.map(payment => this.mapToEntity(payment));
    const totalPages = Math.ceil(total / limit);

    return {
      data: payments,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    };
  }

  async getById(id: number): Promise<Payment | null> {
    const paymentORM = await this.repository.findOne({
      where: { id },
      relations: ['contract']
    });
    
    if (!paymentORM) return null;
    return this.mapToEntity(paymentORM);
  }

  async update(id: number, payment: Payment): Promise<Payment | null> {
    const existingPayment = await this.repository.findOne({ where: { id } });
    if (!existingPayment) return null;

    existingPayment.contract_id = payment.contract_id;
    existingPayment.mes = payment.mes;
    existingPayment.anio = payment.anio;
    existingPayment.fecha_pago = payment.fecha_pago;
    existingPayment.valor_pagado = payment.valor_pagado;
    existingPayment.metodo_pago = payment.metodo_pago;
    existingPayment.observacion = payment.observacion || '';
    existingPayment.updatedAt = new Date();

    const updatedPayment = await this.repository.save(existingPayment);
    return this.mapToEntity(updatedPayment);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if ((result.affected || 0) === 0) {
      throw new Error('Payment not found');
    }
  }

  // Payment-specific methods
  async getPaymentsByContract(contractId: number): Promise<Payment[]> {
    const paymentsORM = await this.repository.find({
      where: { contract_id: contractId },
      relations: ['contract'],
      order: { anio: 'DESC', mes: 'DESC', fecha_pago: 'DESC' }
    });
    
    return paymentsORM.map(payment => this.mapToEntity(payment));
  }

  async getPaymentsByMonth(mes: number, anio: number): Promise<Payment[]> {
    const paymentsORM = await this.repository.find({
      where: { mes, anio },
      relations: ['contract'],
      order: { fecha_pago: 'DESC' }
    });
    
    return paymentsORM.map(payment => this.mapToEntity(payment));
  }

  async getPaymentsByContractAndMonth(contractId: number, mes: number, anio: number): Promise<Payment[]> {
    const paymentsORM = await this.repository.find({
      where: { contract_id: contractId, mes, anio },
      relations: ['contract'],
      order: { fecha_pago: 'DESC' }
    });
    
    return paymentsORM.map(payment => this.mapToEntity(payment));
  }

  async getPaymentsSummaryPending(mes?: number, anio?: number): Promise<{
    totalPending: number;
    totalPaid: number;
    contractsPending: number;
    contractsPaid: number;
  }> {
    const currentDate = new Date();
    const currentMonth = mes || (currentDate.getMonth() + 1);
    const currentYear = anio || currentDate.getFullYear();

    // Get all active contracts
    const activeContractsQuery = `
      SELECT COUNT(*) as total_contracts
      FROM contratos 
      WHERE active = true
    `;

    // Get contracts with payments for the specified month
    const paidContractsQuery = `
      SELECT 
        COUNT(DISTINCT contract_id) as contracts_paid,
        COALESCE(SUM(valor_pagado), 0) as total_paid
      FROM pagos 
      WHERE mes = $1 AND anio = $2
    `;

    const [activeResult, paidResult] = await Promise.all([
      this.repository.query(activeContractsQuery),
      this.repository.query(paidContractsQuery, [currentMonth, currentYear])
    ]);

    const totalContracts = parseInt(activeResult[0]?.total_contracts || '0');
    const contractsPaid = parseInt(paidResult[0]?.contracts_paid || '0');
    const totalPaid = parseFloat(paidResult[0]?.total_paid || '0');

    return {
      totalPending: 0, // Would need contract amounts to calculate
      totalPaid: totalPaid,
      contractsPending: totalContracts - contractsPaid,
      contractsPaid: contractsPaid
    };
  }

  private mapToEntity(paymentORM: PaymentORM): Payment {
    const payment = new Payment(
      paymentORM.contract_id,
      paymentORM.mes,
      paymentORM.anio,
      paymentORM.fecha_pago,
      paymentORM.valor_pagado,
      paymentORM.metodo_pago,
      paymentORM.observacion
    );
    
    payment.id = paymentORM.id;
    (payment as any).createdAt = paymentORM.createdAt;
    (payment as any).updatedAt = paymentORM.updatedAt;
    
    return payment;
  }
}

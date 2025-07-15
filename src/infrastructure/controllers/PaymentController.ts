import { Request, Response } from 'express';
import { GetAllPayments } from '../../domain/usecases/Payment/GetAllPayments';
import { GetPaymentById } from '../../domain/usecases/Payment/GetPaymentById';
import { CreatePayment } from '../../domain/usecases/Payment/CreatePayment';
import { GetPaymentsByContract } from '../../domain/usecases/Payment/GetPaymentsByContract';
import { GetPaymentsByMonth } from '../../domain/usecases/Payment/GetPaymentsByMonth';
import { GetPaymentsSummaryPending } from '../../domain/usecases/Payment/GetPaymentsSummaryPending';
import { PaymentRepository } from '../repositories/PaymentRepository';
import { ContractRepository } from '../repositories/ContractRepository';
import { CreatePaymentDto, PaymentQueryDto, PaymentResponseDto } from '../../application/dtos';

export class PaymentController {
  private getAllPayments: GetAllPayments;
  private getPaymentById: GetPaymentById;
  private createPayment: CreatePayment;
  private getPaymentsByContract: GetPaymentsByContract;
  private getPaymentsByMonth: GetPaymentsByMonth;
  private getPaymentsSummaryPending: GetPaymentsSummaryPending;

  constructor() {
    const paymentRepository = new PaymentRepository();
    const contractRepository = new ContractRepository();
    
    this.getAllPayments = new GetAllPayments(paymentRepository);
    this.getPaymentById = new GetPaymentById(paymentRepository);
    this.createPayment = new CreatePayment(paymentRepository, contractRepository);
    this.getPaymentsByContract = new GetPaymentsByContract(paymentRepository);
    this.getPaymentsByMonth = new GetPaymentsByMonth(paymentRepository);
    this.getPaymentsSummaryPending = new GetPaymentsSummaryPending(paymentRepository);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const query = PaymentQueryDto.fromQuery(req.query);
      const result = await this.getAllPayments.execute(query.page, query.limit);
      
      res.status(200).json({
        success: true,
        data: PaymentResponseDto.fromEntities(result.payments),
        pagination: {
          page: result.page,
          limit: query.limit,
          total: result.total,
          totalPages: result.totalPages
        },
        message: 'Payments retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving payments',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid payment ID'
        });
        return;
      }

      const payment = await this.getPaymentById.execute(id);
      
      if (!payment) {
        res.status(404).json({
          success: false,
          message: 'Payment not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: PaymentResponseDto.fromEntity(payment),
        message: 'Payment retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving payment',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = CreatePaymentDto.fromRequest(req.body);
      const payment = await this.createPayment.execute(dto);
      
      res.status(201).json({
        success: true,
        data: PaymentResponseDto.fromEntity(payment),
        message: 'Payment created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error creating payment',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getByContract(req: Request, res: Response): Promise<void> {
    try {
      const contractId = parseInt(req.params.contractId);
      
      if (isNaN(contractId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid contract ID'
        });
        return;
      }

      const payments = await this.getPaymentsByContract.execute(contractId);
      
      res.status(200).json({
        success: true,
        data: PaymentResponseDto.fromEntities(payments),
        message: 'Contract payments retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving contract payments',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getByMonth(req: Request, res: Response): Promise<void> {
    try {
      const mes = req.query.mes ? parseInt(req.query.mes as string) : undefined;
      const anio = req.query.anio ? parseInt(req.query.anio as string) : undefined;
      
      const payments = await this.getPaymentsByMonth.execute(mes, anio);
      
      res.status(200).json({
        success: true,
        data: PaymentResponseDto.fromEntities(payments),
        message: 'Monthly payments retrieved successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error retrieving monthly payments',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getSummaryPending(req: Request, res: Response): Promise<void> {
    try {
      const mes = req.query.mes ? parseInt(req.query.mes as string) : undefined;
      const anio = req.query.anio ? parseInt(req.query.anio as string) : undefined;
      
      const summary = await this.getPaymentsSummaryPending.execute(mes, anio);
      
      res.status(200).json({
        success: true,
        data: summary,
        message: 'Payment summary retrieved successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error retrieving payment summary',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

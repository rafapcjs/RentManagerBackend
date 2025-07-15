import { Request, Response } from 'express';
import { CreateContract } from '../../domain/usecases/Contract/CreateContract';
import { GetContractById } from '../../domain/usecases/Contract/GetContractById';
import { GetAllContracts } from '../../domain/usecases/Contract/GetAllContracts';
import { UpdateContract } from '../../domain/usecases/Contract/UpdateContract';
import { DeleteContract } from '../../domain/usecases/Contract/DeleteContract';
import { IContractRepository } from '../../interfaces/repositories/IContractRepository';
import { ITenantRepository } from '../../interfaces/repositories/ITenantRepository';
import { IPropertyRepository } from '../../interfaces/repositories/IPropertyRepository';
import { 
  CreateContractDto, 
  UpdateContractDto, 
  ContractResponseDto 
} from '../../application/dtos';

export class ContractController {
  private getAllContracts: GetAllContracts;
  private getContractById: GetContractById;
  private createContract: CreateContract;
  private updateContract: UpdateContract;
  private deleteContract: DeleteContract;

  constructor(
    contractRepository: IContractRepository,
    tenantRepository: ITenantRepository,
    propertyRepository: IPropertyRepository
  ) {
    this.getAllContracts = new GetAllContracts(contractRepository);
    this.getContractById = new GetContractById(contractRepository);
    this.createContract = new CreateContract(contractRepository, tenantRepository, propertyRepository);
    this.updateContract = new UpdateContract(contractRepository, tenantRepository, propertyRepository);
    this.deleteContract = new DeleteContract(contractRepository, propertyRepository);
  }

  // GET /contracts - Get all contracts with pagination
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.getAllContracts.execute(page, limit);
      const response = result.contracts.map((contract: any) => ContractResponseDto.fromDomain(contract));
      
      res.status(200).json({
        success: true,
        data: response,
        pagination: {
          page: result.page,
          limit: limit,
          total: result.total,
          totalPages: result.totalPages
        },
        message: 'Contracts retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving contracts',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // POST /contracts - Create new contract
  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = CreateContractDto.fromRequest(req.body);
      
      const contract = await this.createContract.execute(dto);
      const response = ContractResponseDto.fromDomain(contract);
      
      res.status(201).json({
        success: true,
        data: response,
        message: 'Contract created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error creating contract'
      });
    }
  }

  // GET /contracts/:id - Get contract by ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid contract ID'
        });
        return;
      }

      const contract = await this.getContractById.execute(id);
      
      if (!contract) {
        res.status(404).json({
          success: false,
          message: 'Contract not found'
        });
        return;
      }

      const response = ContractResponseDto.fromDomain(contract);
      
      res.status(200).json({
        success: true,
        data: response,
        message: 'Contract retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving contract',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // PUT /contracts/:id - Update contract
  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid contract ID'
        });
        return;
      }

      const dto = UpdateContractDto.fromRequest(req.body);
      
      const contract = await this.updateContract.execute(id, dto);
      const response = ContractResponseDto.fromDomain(contract);
      
      res.status(200).json({
        success: true,
        data: response,
        message: 'Contract updated successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error updating contract'
      });
    }
  }

  // DELETE /contracts/:id - Delete contract
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid contract ID'
        });
        return;
      }

      await this.deleteContract.execute(id);
      
      res.status(200).json({
        success: true,
        message: 'Contract deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error deleting contract'
      });
    }
  }
}

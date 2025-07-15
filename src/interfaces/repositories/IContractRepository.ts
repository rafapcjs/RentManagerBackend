import { Contract } from '../../domain/entities/Contract';
import { PaginationOptions, PaginatedResult } from '../common/Pagination';

export interface IContractRepository {
  getAll(options?: PaginationOptions): Promise<PaginatedResult<Contract>>;
  getById(id: number): Promise<Contract | null>;
  create(contract: Contract): Promise<Contract>;
  update(id: number, contract: Contract): Promise<Contract | null>;
  delete(id: number): Promise<void>;
  
  // Contract-specific methods
  findByDni(dni: string): Promise<Contract[]>;
  findByPropertyId(propertyId: number): Promise<Contract[]>;
  findActiveContracts(): Promise<Contract[]>;
  findByDniAndPropertyId(dni: string, propertyId: number): Promise<Contract | null>;
}
import { Tenant } from "../../domain/entities/Tenant";
import { PaginationOptions, PaginatedResult } from "../common/Pagination";

export interface ITentantRepository {
  getAll(options?: PaginationOptions): Promise<PaginatedResult<Tenant>>;
  getByDni(dni: string): Promise<Tenant | null>;
  create(tenant: Tenant): Promise<Tenant>;
  update(dni: string, tenant: Tenant): Promise<Tenant | null>;
  delete(dni: string): Promise<void>;
}
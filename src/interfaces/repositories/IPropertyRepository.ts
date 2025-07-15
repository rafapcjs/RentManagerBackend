import { Property } from "../../domain/entities/Property";
import { PaginationOptions, PaginatedResult } from "../common/Pagination";

export interface IPropertyRepository {
  getAll(options?: PaginationOptions): Promise<PaginatedResult<Property>>;
  getById(id: number): Promise<Property | null>;
  create(property: Property): Promise<Property>;
  update(id: number, property: Property): Promise<Property | null>;
  delete(id: number): Promise<void>;
}

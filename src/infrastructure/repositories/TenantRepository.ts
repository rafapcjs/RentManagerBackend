import { AppDataSource } from '../../config/data-source';
import { Tenant } from '../../domain/entities/Tenant';
import { ITentantRepository } from '../../interfaces/repositories/ITentantRepository';
import { PaginationOptions, PaginatedResult } from '../../interfaces/common/Pagination';
import { TentantORM } from '../typeorm/TentantORM';
 

export class TenantRepository implements ITentantRepository {
  private repo = AppDataSource.getRepository(TentantORM);

  async getAll(options?: PaginationOptions): Promise<PaginatedResult<Tenant>> {
    // Valores por defecto para la paginación
    const page = options?.page || 1;
    const limit = Math.min(options?.limit || 10, 100);
    const sortBy = options?.sortBy || 'dni'; // DNI como ordenamiento por defecto
    const sortOrder = options?.sortOrder || 'ASC';
    
    // Calcular offset
    const offset = (page - 1) * limit;
    
    // Obtener el total de elementos
    const totalItems = await this.repo.count();
    
    // Obtener los elementos paginados
    const tenants = await this.repo.find({
      take: limit,
      skip: offset,
      order: {
        [sortBy]: sortOrder
      }
    });
    
    // Calcular metadatos de paginación
    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
    
    // Mapear a entidades de dominio con ID y DNI
    const data = tenants.map(t => new Tenant(t.dni, t.fullName, t.numberPhone, t.createdAt, t.updatedAt, t.id));
    
    return {
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage,
        hasPreviousPage
      }
    };
  }

  async getByDni(dni: string): Promise<Tenant | null> {
    const tenant = await this.repo.findOneBy({ dni });
    if (!tenant) return null;
    return new Tenant(tenant.dni, tenant.fullName, tenant.numberPhone, tenant.createdAt, tenant.updatedAt, tenant.id);
  }

  async create(tenant: Tenant): Promise<Tenant> {
    const tenantData = {
      dni: tenant.dni,
      fullName: tenant.fullName,
      numberPhone: tenant.numberPhone
    };
    
    const saved = await this.repo.save(tenantData);
    return new Tenant(saved.dni, saved.fullName, saved.numberPhone, saved.createdAt, saved.updatedAt, saved.id);
  }

  async update(dni: string, tenant: Tenant): Promise<Tenant | null> {
    // Actualizar usando los datos de la entidad
    const updateData = {
      fullName: tenant.fullName,
      numberPhone: tenant.numberPhone
    };
    
    await this.repo.update({ dni }, updateData);
    return this.getByDni(dni);
  }

  async delete(dni: string): Promise<void> {
    await this.repo.delete({ dni });
  }
}

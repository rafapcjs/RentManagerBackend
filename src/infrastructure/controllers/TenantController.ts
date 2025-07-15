import { Request, Response } from 'express';
import { GetAllTenants } from '../../domain/usecases/Tentant/GetAllTenants';
import { GetTenantByDni } from '../../domain/usecases/Tentant/GetTenantByDni';
import { CreateTenant } from '../../domain/usecases/Tentant/CreateTenant';
import { UpdateTenant } from '../../domain/usecases/Tentant/UpdateTenant';
import { DeleteTenant } from '../../domain/usecases/Tentant/DeleteTenant';
import { ITentantRepository } from '../../interfaces/repositories/ITentantRepository';
import { 
  CreateTenantDto, 
  UpdateTenantDto, 
  TenantResponseDto, 
  PaginatedResponseDto 
} from '../../application/dtos';

export class TenantController {
  private getAllTenants: GetAllTenants;
  private getTenantByDni: GetTenantByDni;
  private createTenant: CreateTenant;
  private updateTenant: UpdateTenant;
  private deleteTenant: DeleteTenant;

  constructor(tenantRepository: ITentantRepository) {
    this.getAllTenants = new GetAllTenants(tenantRepository);
    this.getTenantByDni = new GetTenantByDni(tenantRepository);
    this.createTenant = new CreateTenant(tenantRepository);
    this.updateTenant = new UpdateTenant(tenantRepository);
    this.deleteTenant = new DeleteTenant(tenantRepository);
  }

  // GET /tenants - Obtener todos los inquilinos con paginación
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const paginationOptions = req.pagination;
      const result = await this.getAllTenants.execute(paginationOptions);
      
      // Convertir a DTOs de respuesta
      const responseDto = PaginatedResponseDto.fromPaginatedResult(
        result,
        (tenant: any) => TenantResponseDto.fromDomain(tenant)
      );
      
      res.status(200).json({
        success: true,
        ...responseDto.toJSON(),
        message: 'Tenants retrieved successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error retrieving tenants',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // GET /tenants/:dni - Obtener inquilino por DNI
  async getByDni(req: Request, res: Response): Promise<void> {
    try {
      const { dni } = req.params;
      const tenant = await this.getTenantByDni.execute(dni);
      
      if (!tenant) {
        res.status(404).json({
          success: false,
          message: `Tenant with DNI ${dni} not found`
        });
        return;
      }

      // Convertir a DTO de respuesta
      const responseDto = TenantResponseDto.fromDomain(tenant);

      res.status(200).json({
        success: true,
        data: responseDto.toJSON(),
        message: 'Tenant retrieved successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error retrieving tenant',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // POST /tenants - Crear un nuevo inquilino
  async create(req: Request, res: Response): Promise<void> {
    try {
      // Validar el DTO de entrada
      const createDto = CreateTenantDto.fromRequest(req.body);
      
      const tenant = await this.createTenant.execute(createDto);
      
      // Convertir a DTO de respuesta
      const responseDto = TenantResponseDto.fromDomain(tenant);
      
      res.status(201).json({
        success: true,
        data: responseDto.toJSON(),
        message: 'Tenant created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error creating tenant',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // PUT /tenants/:dni - Actualizar inquilino
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { dni } = req.params;
      
      // Validar el DTO de entrada
      const updateDto = UpdateTenantDto.fromRequest(req.body);
      
      const updatedTenant = await this.updateTenant.execute(dni, updateDto);
      
      // Convertir a DTO de respuesta
      const responseDto = TenantResponseDto.fromDomain(updatedTenant);
      
      res.status(200).json({
        success: true,
        data: responseDto.toJSON(),
        message: 'Tenant updated successfully'
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: 'Error updating tenant',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // DELETE /tenants/:dni - Eliminar inquilino
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { dni } = req.params;
      await this.deleteTenant.execute(dni);
      
      res.status(200).json({
        success: true,
        message: 'Tenant deleted successfully'
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: 'Error deleting tenant',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

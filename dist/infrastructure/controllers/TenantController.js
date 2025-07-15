"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantController = void 0;
const GetAllTenants_1 = require("../../domain/usecases/Tentant/GetAllTenants");
const GetTenantByDni_1 = require("../../domain/usecases/Tentant/GetTenantByDni");
const CreateTenant_1 = require("../../domain/usecases/Tentant/CreateTenant");
const UpdateTenant_1 = require("../../domain/usecases/Tentant/UpdateTenant");
const DeleteTenant_1 = require("../../domain/usecases/Tentant/DeleteTenant");
const dtos_1 = require("../../application/dtos");
class TenantController {
    constructor(tenantRepository) {
        this.getAllTenants = new GetAllTenants_1.GetAllTenants(tenantRepository);
        this.getTenantByDni = new GetTenantByDni_1.GetTenantByDni(tenantRepository);
        this.createTenant = new CreateTenant_1.CreateTenant(tenantRepository);
        this.updateTenant = new UpdateTenant_1.UpdateTenant(tenantRepository);
        this.deleteTenant = new DeleteTenant_1.DeleteTenant(tenantRepository);
    }
    // GET /tenants - Obtener todos los inquilinos con paginación
    async getAll(req, res) {
        try {
            const paginationOptions = req.pagination;
            const result = await this.getAllTenants.execute(paginationOptions);
            // Convertir a DTOs de respuesta
            const responseDto = dtos_1.PaginatedResponseDto.fromPaginatedResult(result, (tenant) => dtos_1.TenantResponseDto.fromDomain(tenant));
            res.status(200).json({
                success: true,
                ...responseDto.toJSON(),
                message: 'Tenants retrieved successfully'
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error retrieving tenants',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    // GET /tenants/:dni - Obtener inquilino por DNI
    async getByDni(req, res) {
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
            const responseDto = dtos_1.TenantResponseDto.fromDomain(tenant);
            res.status(200).json({
                success: true,
                data: responseDto.toJSON(),
                message: 'Tenant retrieved successfully'
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error retrieving tenant',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    // POST /tenants - Crear un nuevo inquilino
    async create(req, res) {
        try {
            // Validar el DTO de entrada
            const createDto = dtos_1.CreateTenantDto.fromRequest(req.body);
            const tenant = await this.createTenant.execute(createDto);
            // Convertir a DTO de respuesta
            const responseDto = dtos_1.TenantResponseDto.fromDomain(tenant);
            res.status(201).json({
                success: true,
                data: responseDto.toJSON(),
                message: 'Tenant created successfully'
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error creating tenant',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    // PUT /tenants/:dni - Actualizar inquilino
    async update(req, res) {
        try {
            const { dni } = req.params;
            // Validar el DTO de entrada
            const updateDto = dtos_1.UpdateTenantDto.fromRequest(req.body);
            const updatedTenant = await this.updateTenant.execute(dni, updateDto);
            // Convertir a DTO de respuesta
            const responseDto = dtos_1.TenantResponseDto.fromDomain(updatedTenant);
            res.status(200).json({
                success: true,
                data: responseDto.toJSON(),
                message: 'Tenant updated successfully'
            });
        }
        catch (error) {
            const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 400;
            res.status(statusCode).json({
                success: false,
                message: 'Error updating tenant',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    // DELETE /tenants/:dni - Eliminar inquilino
    async delete(req, res) {
        try {
            const { dni } = req.params;
            await this.deleteTenant.execute(dni);
            res.status(200).json({
                success: true,
                message: 'Tenant deleted successfully'
            });
        }
        catch (error) {
            const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 400;
            res.status(statusCode).json({
                success: false,
                message: 'Error deleting tenant',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}
exports.TenantController = TenantController;

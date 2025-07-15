"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTenant = void 0;
class UpdateTenant {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(dni, updateDto) {
        if (!dni || dni.trim() === '') {
            throw new Error('DNI is required');
        }
        // Verificar que el tenant existe
        const existingTenant = await this.repo.getByDni(dni);
        if (!existingTenant) {
            throw new Error(`Tenant with DNI ${dni} not found`);
        }
        // Las validaciones ya se realizan en el DTO
        // Actualizar la entidad existente con los datos del DTO
        existingTenant.updateFromDto(updateDto);
        const updatedTenant = await this.repo.update(dni, existingTenant);
        if (!updatedTenant) {
            throw new Error(`Failed to update tenant with DNI ${dni}`);
        }
        return updatedTenant;
    }
}
exports.UpdateTenant = UpdateTenant;

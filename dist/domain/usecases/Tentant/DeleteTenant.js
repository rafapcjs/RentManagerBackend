"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTenant = void 0;
class DeleteTenant {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(dni) {
        if (!dni || dni.trim() === '') {
            throw new Error('DNI is required');
        }
        // Verificar que el tenant existe antes de eliminarlo
        const existingTenant = await this.repo.getByDni(dni);
        if (!existingTenant) {
            throw new Error(`Tenant with DNI ${dni} not found`);
        }
        await this.repo.delete(dni);
    }
}
exports.DeleteTenant = DeleteTenant;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTenantByDni = void 0;
class GetTenantByDni {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(dni) {
        if (!dni || dni.trim() === '') {
            throw new Error('DNI is required');
        }
        return this.repo.getByDni(dni);
    }
}
exports.GetTenantByDni = GetTenantByDni;

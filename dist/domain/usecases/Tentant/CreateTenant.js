"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTenant = void 0;
const Tenant_1 = require("../../entities/Tenant");
class CreateTenant {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(createDto) {
        // Las validaciones ya se realizan en el DTO
        // Verificar que no exista un tenant con el mismo DNI
        const existingTenant = await this.repo.getByDni(createDto.dni);
        if (existingTenant) {
            throw new Error(`Tenant with DNI ${createDto.dni} already exists`);
        }
        // Crear entidad de dominio desde el DTO
        const tenant = Tenant_1.Tenant.fromCreateDto(createDto);
        return this.repo.create(tenant);
    }
}
exports.CreateTenant = CreateTenant;

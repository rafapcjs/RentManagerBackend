"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantRepository = void 0;
const data_sour__async_getByDni_dni__string___Promise_Tenant___null___1 = require("../../config/data-sour  async getByDni(dni: string): Promise<Tenant | null> {");
const tenant = await this.repo.findOneBy({ dni });
if (!tenant)
    return null;
return new Tenant(tenant.dni, tenant.fullName, tenant.numberPhone, tenant.createdAt, tenant.updatedAt);
async;
create(data, (Omit));
Promise < Tenant > {
    const: tenantData = {
        dni: data.dni,
        fullName: data.fullName,
        numberPhone: data.numberPhone
    },
    const: saved = await this.repo.save(tenantData),
    return: new Tenant(saved.dni, saved.fullName, saved.numberPhone, saved.createdAt, saved.updatedAt)
};
async;
update(dni, string, data, (Partial));
Promise < Tenant | null > {
    // Solo actualizar campos específicos
    const: updateData, any = {},
    if(data) { }, : .fullName !== undefined, updateData, : .fullName = data.fullName,
    if(data) { }, : .numberPhone !== undefined, updateData, : .numberPhone = data.numberPhone,
    await, this: .repo.update({ dni }, updateData),
    return: this.getByDni(dni)
};
async;
delete (dni);
string;
Promise < void  > {
    await, this: .repo.delete({ dni })
};
t;
from;
'../../domain/entities/Tenant';
const TentantORM_1 = require("../typeorm/TentantORM");
class TenantRepository {
    constructor() {
        this.repo = data_sour__async_getByDni_dni__string___Promise_Tenant___null___1.AppDataSource.getRepository(TentantORM_1.TentantORM);
    }
    async getAll(options) {
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
        // Mapear a entidades de dominio usando DNI como clave
        const data = tenants.map(t => new Tenant(t.dni, t.fullName, t.numberPhone, t.createdAt, t.updatedAt));
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
    async getByDni(dni) {
        const tenant = await this.repo.findOneBy({ dni });
        if (!tenant)
            return null;
        return new Tenant(tenant.id, tenant.fullName, tenant.dni, tenant.numberPhone);
    }
    async create(data) {
        const saved = await this.repo.save(data);
        return new Tenant(saved.id, saved.fullName, saved.dni, saved.numberPhone);
    }
    async update(dni, data) {
        await this.repo.update({ dni }, data);
        return this.getByDni(dni);
    }
    async delete(dni) {
        await this.repo.delete({ dni });
    }
}
exports.TenantRepository = TenantRepository;

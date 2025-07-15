"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyRepository = void 0;
const data_source_1 = require("../../config/data-source");
const Property_1 = require("../../domain/entities/Property");
const PropertyORM_1 = require("../typeorm/PropertyORM");
class PropertyRepository {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(PropertyORM_1.PropertyORM);
    }
    async getAll(options) {
        // Valores por defecto para la paginación
        const page = options?.page || 1;
        const limit = Math.min(options?.limit || 10, 100);
        const sortBy = options?.sortBy || 'id';
        const sortOrder = options?.sortOrder || 'ASC';
        // Calcular offset
        const offset = (page - 1) * limit;
        // Obtener el total de elementos
        const totalItems = await this.repo.count();
        // Obtener los elementos paginados
        const properties = await this.repo.find({
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
        // Mapear a entidades de dominio
        const data = properties.map(p => new Property_1.Property(p.direccion, p.tipo, p.valor_arriendo, p.estado, p.descripcion, p.codigo_agua, p.codigo_luz, p.codigo_gas, p.createdAt, p.updatedAt, p.id));
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
    async getById(id) {
        const property = await this.repo.findOneBy({ id });
        if (!property)
            return null;
        return new Property_1.Property(property.direccion, property.tipo, property.valor_arriendo, property.estado, property.descripcion, property.codigo_agua, property.codigo_luz, property.codigo_gas, property.createdAt, property.updatedAt, property.id);
    }
    async create(property) {
        const propertyData = {
            direccion: property.direccion,
            tipo: property.tipo,
            valor_arriendo: property.valor_arriendo,
            estado: property.estado,
            descripcion: property.descripcion,
            codigo_agua: property.codigo_agua,
            codigo_luz: property.codigo_luz,
            codigo_gas: property.codigo_gas
        };
        const saved = await this.repo.save(propertyData);
        return new Property_1.Property(saved.direccion, saved.tipo, saved.valor_arriendo, saved.estado, saved.descripcion, saved.codigo_agua, saved.codigo_luz, saved.codigo_gas, saved.createdAt, saved.updatedAt, saved.id);
    }
    async update(id, property) {
        // Actualizar usando los datos de la entidad
        const updateData = {
            direccion: property.direccion,
            tipo: property.tipo,
            valor_arriendo: property.valor_arriendo,
            estado: property.estado,
            descripcion: property.descripcion,
            codigo_agua: property.codigo_agua,
            codigo_luz: property.codigo_luz,
            codigo_gas: property.codigo_gas
        };
        await this.repo.update({ id }, updateData);
        return this.getById(id);
    }
    async delete(id) {
        await this.repo.delete({ id });
    }
}
exports.PropertyRepository = PropertyRepository;

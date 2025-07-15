"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRepository = void 0;
const Contract_1 = require("../../domain/entities/Contract");
const ContractORM_1 = require("../typeorm/ContractORM");
const data_source_1 = require("../../config/data-source");
class ContractRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(ContractORM_1.ContractORM);
    }
    async create(contract) {
        const contractORM = new ContractORM_1.ContractORM();
        contractORM.dni = contract.dni;
        contractORM.property_id = contract.property_id;
        contractORM.start_date = contract.start_date;
        contractORM.end_date = contract.end_date;
        contractORM.monthly_value = contract.monthly_value;
        contractORM.active = contract.active;
        contractORM.images = contract.images || [];
        contractORM.createdAt = new Date();
        contractORM.updatedAt = new Date();
        const savedContract = await this.repository.save(contractORM);
        return this.mapToEntity(savedContract);
    }
    // Standard repository methods (for consistency)
    async getAll(options) {
        const page = options?.page || 1;
        const limit = options?.limit || 10;
        const [contractsORM, total] = await this.repository.findAndCount({
            relations: ['tenant', 'property'],
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit
        });
        const contracts = contractsORM.map(contract => this.mapToEntity(contract));
        const totalPages = Math.ceil(total / limit);
        return {
            data: contracts,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: total,
                itemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        };
    }
    async getById(id) {
        return this.findById(id);
    }
    async findById(id) {
        const contractORM = await this.repository.findOne({
            where: { id },
            relations: ['tenant', 'property']
        });
        if (!contractORM)
            return null;
        return this.mapToEntity(contractORM);
    }
    async findByDni(dni) {
        const contractsORM = await this.repository.find({
            where: { dni },
            relations: ['tenant', 'property'],
            order: { createdAt: 'DESC' }
        });
        return contractsORM.map(contract => this.mapToEntity(contract));
    }
    async findByPropertyId(propertyId) {
        const contractsORM = await this.repository.find({
            where: { property_id: propertyId },
            relations: ['tenant', 'property'],
            order: { createdAt: 'DESC' }
        });
        return contractsORM.map(contract => this.mapToEntity(contract));
    }
    async findActiveContracts() {
        const contractsORM = await this.repository.find({
            where: { active: true },
            relations: ['tenant', 'property'],
            order: { createdAt: 'DESC' }
        });
        return contractsORM.map(contract => this.mapToEntity(contract));
    }
    async findAll(page = 1, limit = 10) {
        const [contractsORM, total] = await this.repository.findAndCount({
            relations: ['tenant', 'property'],
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit
        });
        const contracts = contractsORM.map(contract => this.mapToEntity(contract));
        const totalPages = Math.ceil(total / limit);
        return {
            contracts,
            total,
            page,
            totalPages
        };
    }
    async update(id, contract) {
        const existingContract = await this.repository.findOne({ where: { id } });
        if (!existingContract)
            return null;
        existingContract.start_date = contract.start_date;
        existingContract.end_date = contract.end_date;
        existingContract.monthly_value = contract.monthly_value;
        existingContract.active = contract.active;
        existingContract.images = contract.images;
        existingContract.dni = contract.dni;
        existingContract.property_id = contract.property_id;
        existingContract.updatedAt = new Date();
        const updatedContract = await this.repository.save(existingContract);
        return this.mapToEntity(updatedContract);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        if ((result.affected || 0) === 0) {
            throw new Error('Contract not found');
        }
    }
    async findByDniAndPropertyId(dni, propertyId) {
        const contractORM = await this.repository.findOne({
            where: {
                dni: dni,
                property_id: propertyId
            },
            relations: ['tenant', 'property']
        });
        if (!contractORM)
            return null;
        return this.mapToEntity(contractORM);
    }
    mapToEntity(contractORM) {
        return new Contract_1.Contract(contractORM.dni, contractORM.property_id, contractORM.start_date, contractORM.end_date, contractORM.monthly_value, contractORM.active, contractORM.images, contractORM.createdAt, contractORM.updatedAt, contractORM.id, contractORM.tenant, contractORM.property);
    }
}
exports.ContractRepository = ContractRepository;

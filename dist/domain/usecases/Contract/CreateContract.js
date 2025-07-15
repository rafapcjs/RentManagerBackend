"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContract = void 0;
const Contract_1 = require("../../entities/Contract");
const PropertyConstants_1 = require("../../constants/PropertyConstants");
class CreateContract {
    constructor(contractRepository, tenantRepository, propertyRepository) {
        this.contractRepository = contractRepository;
        this.tenantRepository = tenantRepository;
        this.propertyRepository = propertyRepository;
    }
    async execute(dto) {
        const errors = dto.validate();
        if (errors.length > 0) {
            throw new Error(`Validation errors: ${errors.join(', ')}`);
        }
        const tenant = await this.tenantRepository.getByDni(dto.dni);
        if (!tenant) {
            throw new Error('Tenant not found');
        }
        const property = await this.propertyRepository.getById(dto.propertyId);
        if (!property) {
            throw new Error('Property not found');
        }
        if (property.estado !== PropertyConstants_1.PropertyStatus.DISPONIBLE) {
            throw new Error('Property is not available');
        }
        const existingContract = await this.contractRepository.findByDniAndPropertyId(dto.dni, dto.propertyId);
        if (existingContract && existingContract.active) {
            throw new Error('Active contract already exists for this tenant and property');
        }
        const domainData = dto.toDomain();
        const contract = Contract_1.Contract.fromCreateDto(domainData);
        const dateErrors = contract.validateDates();
        if (dateErrors.length > 0) {
            throw new Error(`Date validation errors: ${dateErrors.join(', ')}`);
        }
        const createdContract = await this.contractRepository.create(contract);
        property.estado = PropertyConstants_1.PropertyStatus.ARRENDADA;
        await this.propertyRepository.update(dto.propertyId, property);
        return createdContract;
    }
}
exports.CreateContract = CreateContract;

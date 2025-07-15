"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContract = void 0;
const Contract_1 = require("../../entities/Contract");
const PropertyConstants_1 = require("../../constants/PropertyConstants");
class UpdateContract {
    constructor(contractRepository, tenantRepository, propertyRepository) {
        this.contractRepository = contractRepository;
        this.tenantRepository = tenantRepository;
        this.propertyRepository = propertyRepository;
    }
    async execute(id, dto) {
        const errors = dto.validate();
        if (errors.length > 0) {
            throw new Error(`Validation errors: ${errors.join(', ')}`);
        }
        const existingContract = await this.contractRepository.getById(id);
        if (!existingContract) {
            throw new Error('Contract not found');
        }
        const domainData = dto.toDomain();
        const updatedContract = new Contract_1.Contract(existingContract.dni, existingContract.property_id, domainData.start_date || existingContract.start_date, domainData.end_date || existingContract.end_date, domainData.monthly_value || existingContract.monthly_value, domainData.active !== undefined ? domainData.active : existingContract.active, domainData.images || existingContract.images);
        const dateErrors = updatedContract.validateDates();
        if (dateErrors.length > 0) {
            throw new Error(`Date validation errors: ${dateErrors.join(', ')}`);
        }
        if (domainData.active === false && existingContract.active) {
            const property = await this.propertyRepository.getById(existingContract.property_id);
            if (property) {
                property.estado = PropertyConstants_1.PropertyStatus.DISPONIBLE;
                await this.propertyRepository.update(existingContract.property_id, property);
            }
        }
        if (domainData.active === true && !existingContract.active) {
            const property = await this.propertyRepository.getById(existingContract.property_id);
            if (property && property.estado !== PropertyConstants_1.PropertyStatus.DISPONIBLE) {
                throw new Error('Property is not available');
            }
            if (property) {
                property.estado = PropertyConstants_1.PropertyStatus.ARRENDADA;
                await this.propertyRepository.update(existingContract.property_id, property);
            }
        }
        const result = await this.contractRepository.update(id, updatedContract);
        if (!result) {
            throw new Error('Failed to update contract');
        }
        return result;
    }
}
exports.UpdateContract = UpdateContract;

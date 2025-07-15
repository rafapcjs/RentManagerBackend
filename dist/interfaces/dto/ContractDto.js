"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractResponseDto = exports.UpdateContractDto = exports.CreateContractDto = void 0;
class CreateContractDto {
    // Validation method
    validate() {
        const errors = [];
        if (!this.dni || this.dni.trim() === '') {
            errors.push('DNI is required');
        }
        if (!this.property_id || this.property_id <= 0) {
            errors.push('Property ID is required and must be positive');
        }
        if (!this.start_date) {
            errors.push('Start date is required');
        }
        else {
            const startDate = new Date(this.start_date);
            if (isNaN(startDate.getTime())) {
                errors.push('Start date must be a valid date');
            }
        }
        if (!this.end_date) {
            errors.push('End date is required');
        }
        else {
            const endDate = new Date(this.end_date);
            if (isNaN(endDate.getTime())) {
                errors.push('End date must be a valid date');
            }
        }
        if (this.start_date && this.end_date) {
            const startDate = new Date(this.start_date);
            const endDate = new Date(this.end_date);
            if (startDate >= endDate) {
                errors.push('Start date must be before end date');
            }
        }
        if (!this.monthly_value || this.monthly_value <= 0) {
            errors.push('Monthly value is required and must be positive');
        }
        if (this.images && this.images.length > 10) {
            errors.push('Maximum 10 images allowed');
        }
        return errors;
    }
}
exports.CreateContractDto = CreateContractDto;
class UpdateContractDto {
    // Validation method
    validate() {
        const errors = [];
        if (this.start_date !== undefined) {
            const startDate = new Date(this.start_date);
            if (isNaN(startDate.getTime())) {
                errors.push('Start date must be a valid date');
            }
        }
        if (this.end_date !== undefined) {
            const endDate = new Date(this.end_date);
            if (isNaN(endDate.getTime())) {
                errors.push('End date must be a valid date');
            }
        }
        if (this.start_date && this.end_date) {
            const startDate = new Date(this.start_date);
            const endDate = new Date(this.end_date);
            if (startDate >= endDate) {
                errors.push('Start date must be before end date');
            }
        }
        if (this.monthly_value !== undefined && this.monthly_value <= 0) {
            errors.push('Monthly value must be positive');
        }
        if (this.images && this.images.length > 10) {
            errors.push('Maximum 10 images allowed');
        }
        return errors;
    }
}
exports.UpdateContractDto = UpdateContractDto;
class ContractResponseDto {
    // Factory method to create from domain entity
    static fromDomain(contract) {
        const dto = new ContractResponseDto();
        dto.id = contract.id;
        dto.dni = contract.dni;
        dto.property_id = contract.property_id;
        dto.start_date = contract.start_date.toISOString().split('T')[0];
        dto.end_date = contract.end_date.toISOString().split('T')[0];
        dto.monthly_value = contract.monthly_value;
        dto.active = contract.active;
        dto.images = contract.images || [];
        dto.createdAt = contract.createdAt?.toISOString() || '';
        dto.updatedAt = contract.updatedAt?.toISOString() || '';
        if (contract.tenant) {
            dto.tenant = {
                dni: contract.tenant.dni,
                name: contract.tenant.name || contract.tenant.nombre,
                email: contract.tenant.email,
                phone: contract.tenant.phone || contract.tenant.telefono
            };
        }
        if (contract.property) {
            dto.property = {
                id: contract.property.id,
                address: contract.property.address || contract.property.direccion,
                type: contract.property.type || contract.property.tipo,
                rental_value: contract.property.rental_value || contract.property.valor_arriendo,
                status: contract.property.status || contract.property.estado
            };
        }
        return dto;
    }
}
exports.ContractResponseDto = ContractResponseDto;

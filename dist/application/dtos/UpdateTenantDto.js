"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTenantDto = void 0;
class UpdateTenantDto {
    constructor(data) {
        this.fullName = data.fullName?.trim();
        this.numberPhone = data.numberPhone?.trim();
    }
    // Factory method para crear desde request HTTP
    static fromRequest(data) {
        const dto = new UpdateTenantDto(data);
        const errors = dto.validate();
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${errors.join(', ')}`);
        }
        return dto;
    }
    // Validaciones
    validate() {
        const errors = [];
        // Solo validar si los campos están presentes
        if (this.fullName !== undefined) {
            if (typeof this.fullName !== 'string' || this.fullName.trim() === '') {
                errors.push('Full name must be a valid string if provided');
            }
            else if (this.fullName.length < 2 || this.fullName.length > 100) {
                errors.push('Full name must be between 2 and 100 characters');
            }
            else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/.test(this.fullName)) {
                errors.push('Full name can only contain letters, spaces, hyphens, and apostrophes');
            }
        }
        if (this.numberPhone !== undefined) {
            if (typeof this.numberPhone !== 'string' || this.numberPhone.trim() === '') {
                errors.push('Phone number must be a valid string if provided');
            }
            else if (this.numberPhone.length < 7 || this.numberPhone.length > 20) {
                errors.push('Phone number must be between 7 and 20 characters');
            }
            else if (!/^[\d\s\-\+\(\)]+$/.test(this.numberPhone)) {
                errors.push('Phone number contains invalid characters');
            }
        }
        return errors;
    }
    // Verificar si tiene datos para actualizar
    hasDataToUpdate() {
        return this.fullName !== undefined || this.numberPhone !== undefined;
    }
    // Convertir a objeto para el dominio (solo campos definidos)
    toDomainObject() {
        const result = {};
        if (this.fullName !== undefined) {
            result.fullName = this.fullName;
        }
        if (this.numberPhone !== undefined) {
            result.numberPhone = this.numberPhone;
        }
        return result;
    }
}
exports.UpdateTenantDto = UpdateTenantDto;

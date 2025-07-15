"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTenantDto = void 0;
// DTO para crear un nuevo inquilino
class CreateTenantDto {
    constructor(data) {
        this.fullName = data.fullName?.trim();
        this.dni = data.dni?.trim();
        this.numberPhone = data.numberPhone?.trim();
    }
    // Factory method para crear desde request HTTP
    static fromRequest(data) {
        const dto = new CreateTenantDto(data);
        const errors = dto.validate();
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${errors.join(', ')}`);
        }
        return dto;
    }
    // Validaciones
    validate() {
        const errors = [];
        if (!this.fullName || this.fullName.length < 2) {
            errors.push('Full name is required and must be at least 2 characters long');
        }
        if (this.fullName && this.fullName.length > 100) {
            errors.push('Full name must not exceed 100 characters');
        }
        if (!this.dni || !/^\d{7,10}$/.test(this.dni)) {
            errors.push('DNI is required and must be between 7 and 10 digits');
        }
        if (!this.numberPhone || this.numberPhone.length < 7) {
            errors.push('Phone number is required and must be at least 7 characters long');
        }
        if (this.numberPhone && this.numberPhone.length > 20) {
            errors.push('Phone number must not exceed 20 characters');
        }
        // Validar que el nombre solo contenga letras, espacios y algunos caracteres especiales
        if (this.fullName && !/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/.test(this.fullName)) {
            errors.push('Full name can only contain letters, spaces, hyphens, and apostrophes');
        }
        // Validar formato de teléfono básico
        if (this.numberPhone && !/^[\d\s\-\+\(\)]+$/.test(this.numberPhone)) {
            errors.push('Phone number contains invalid characters');
        }
        return errors;
    }
    // Método para convertir a objeto plano para el dominio
    toDomain() {
        return {
            fullName: this.fullName,
            dni: this.dni,
            numberPhone: this.numberPhone
        };
    }
}
exports.CreateTenantDto = CreateTenantDto;

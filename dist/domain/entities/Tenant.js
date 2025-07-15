"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tenant = void 0;
class Tenant {
    constructor(dni, // DNI como clave de negocio
    fullName, numberPhone, createdAt, updatedAt, id // ID generado automáticamente por la DB
    ) {
        this.dni = dni;
        this.fullName = fullName;
        this.numberPhone = numberPhone;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.id = id;
    }
    // Método estático para crear desde DTO
    static fromCreateDto(dto) {
        return new Tenant(dto.dni, dto.fullName, dto.numberPhone, new Date(), new Date()
        // ID será null/undefined hasta que se guarde en la DB
        );
    }
    // Método para actualizar desde DTO
    updateFromDto(dto) {
        if (dto.fullName !== undefined) {
            this.fullName = dto.fullName;
        }
        if (dto.numberPhone !== undefined) {
            this.numberPhone = dto.numberPhone;
        }
        this.updatedAt = new Date();
    }
}
exports.Tenant = Tenant;

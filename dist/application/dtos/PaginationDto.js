"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationDto = void 0;
class PaginationDto {
    constructor(query) {
        this.page = Math.max(1, parseInt(query.page) || 1);
        this.limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
        this.sortBy = query.sortBy || 'dni'; // Usar DNI como ordenamiento por defecto
        this.sortOrder = (query.sortOrder?.toUpperCase() === 'DESC') ? 'DESC' : 'ASC';
    }
    // Validaciones
    validate() {
        const errors = [];
        const allowedSortFields = ['dni', 'fullName', 'numberPhone', 'createdAt', 'updatedAt'];
        if (!allowedSortFields.includes(this.sortBy)) {
            errors.push(`Sort by must be one of: ${allowedSortFields.join(', ')}`);
        }
        if (this.page < 1) {
            errors.push('Page number must be greater than 0');
        }
        if (this.limit < 1 || this.limit > 100) {
            errors.push('Limit must be between 1 and 100');
        }
        return errors;
    }
    // Convertir a opciones de paginación para el dominio
    toPaginationOptions() {
        return {
            page: this.page,
            limit: this.limit,
            sortBy: this.sortBy,
            sortOrder: this.sortOrder
        };
    }
    // Calcular offset para la base de datos
    getOffset() {
        return (this.page - 1) * this.limit;
    }
}
exports.PaginationDto = PaginationDto;

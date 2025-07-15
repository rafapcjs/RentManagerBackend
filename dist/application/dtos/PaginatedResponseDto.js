"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedResponseDto = void 0;
class PaginatedResponseDto {
    constructor(data, currentPage, totalPages, totalItems, itemsPerPage) {
        this.data = data;
        this.pagination = {
            currentPage,
            totalPages,
            totalItems,
            itemsPerPage,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1
        };
    }
    // Método estático para crear desde resultado paginado
    static fromPaginatedResult(result, mapFunction) {
        const mappedData = result.data.map(mapFunction);
        return new PaginatedResponseDto(mappedData, result.pagination.currentPage, result.pagination.totalPages, result.pagination.totalItems, result.pagination.itemsPerPage);
    }
    // Convertir a objeto plano para JSON
    toJSON() {
        return {
            data: this.data,
            pagination: this.pagination
        };
    }
}
exports.PaginatedResponseDto = PaginatedResponseDto;

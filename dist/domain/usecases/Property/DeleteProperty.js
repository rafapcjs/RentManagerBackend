"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProperty = void 0;
class DeleteProperty {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        if (!id || id <= 0) {
            throw new Error('Property ID is required and must be a positive number');
        }
        // Verificar que la propiedad existe
        const existingProperty = await this.repo.getById(id);
        if (!existingProperty) {
            throw new Error(`Property with ID ${id} not found`);
        }
        await this.repo.delete(id);
    }
}
exports.DeleteProperty = DeleteProperty;

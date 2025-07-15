"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTenants = void 0;
class GetAllTenants {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(options) {
        // Validaciones
        if (options?.page && options.page < 1) {
            throw new Error('Page number must be greater than 0');
        }
        if (options?.limit && (options.limit < 1 || options.limit > 100)) {
            throw new Error('Limit must be between 1 and 100');
        }
        return this.repo.getAll(options);
    }
}
exports.GetAllTenants = GetAllTenants;

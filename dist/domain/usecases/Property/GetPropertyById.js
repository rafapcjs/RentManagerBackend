"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPropertyById = void 0;
class GetPropertyById {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        if (!id || id <= 0) {
            throw new Error('Property ID is required and must be a positive number');
        }
        return this.repo.getById(id);
    }
}
exports.GetPropertyById = GetPropertyById;

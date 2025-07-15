"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProperties = void 0;
class GetAllProperties {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(options) {
        return this.repo.getAll(options);
    }
}
exports.GetAllProperties = GetAllProperties;

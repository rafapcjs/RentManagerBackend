"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllContracts = void 0;
class GetAllContracts {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }
    async execute(page = 1, limit = 10) {
        const options = { page, limit };
        const result = await this.contractRepository.getAll(options);
        return {
            contracts: result.data,
            total: result.pagination.totalItems,
            page: result.pagination.currentPage,
            totalPages: result.pagination.totalPages
        };
    }
}
exports.GetAllContracts = GetAllContracts;

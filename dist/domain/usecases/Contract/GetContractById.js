"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetContractById = void 0;
class GetContractById {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }
    async execute(id) {
        return await this.contractRepository.getById(id);
    }
}
exports.GetContractById = GetContractById;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteContract = void 0;
const PropertyConstants_1 = require("../../constants/PropertyConstants");
class DeleteContract {
    constructor(contractRepository, propertyRepository) {
        this.contractRepository = contractRepository;
        this.propertyRepository = propertyRepository;
    }
    async execute(id) {
        const existingContract = await this.contractRepository.getById(id);
        if (!existingContract) {
            throw new Error('Contract not found');
        }
        if (existingContract.active) {
            const property = await this.propertyRepository.getById(existingContract.property_id);
            if (property) {
                property.estado = PropertyConstants_1.PropertyStatus.DISPONIBLE;
                await this.propertyRepository.update(existingContract.property_id, property);
            }
        }
        await this.contractRepository.delete(id);
    }
}
exports.DeleteContract = DeleteContract;

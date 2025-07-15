"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractController = void 0;
const CreateContract_1 = require("../../domain/usecases/Contract/CreateContract");
const GetContractById_1 = require("../../domain/usecases/Contract/GetContractById");
const GetAllContracts_1 = require("../../domain/usecases/Contract/GetAllContracts");
const UpdateContract_1 = require("../../domain/usecases/Contract/UpdateContract");
const DeleteContract_1 = require("../../domain/usecases/Contract/DeleteContract");
const dtos_1 = require("../../application/dtos");
class ContractController {
    constructor(contractRepository, tenantRepository, propertyRepository) {
        this.getAllContracts = new GetAllContracts_1.GetAllContracts(contractRepository);
        this.getContractById = new GetContractById_1.GetContractById(contractRepository);
        this.createContract = new CreateContract_1.CreateContract(contractRepository, tenantRepository, propertyRepository);
        this.updateContract = new UpdateContract_1.UpdateContract(contractRepository, tenantRepository, propertyRepository);
        this.deleteContract = new DeleteContract_1.DeleteContract(contractRepository, propertyRepository);
    }
    // GET /contracts - Get all contracts with pagination
    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await this.getAllContracts.execute(page, limit);
            const response = result.contracts.map((contract) => dtos_1.ContractResponseDto.fromDomain(contract));
            res.status(200).json({
                success: true,
                data: response,
                pagination: {
                    page: result.page,
                    limit: limit,
                    total: result.total,
                    totalPages: result.totalPages
                },
                message: 'Contracts retrieved successfully'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving contracts',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    // POST /contracts - Create new contract
    async create(req, res) {
        try {
            const dto = dtos_1.CreateContractDto.fromRequest(req.body);
            const contract = await this.createContract.execute(dto);
            const response = dtos_1.ContractResponseDto.fromDomain(contract);
            res.status(201).json({
                success: true,
                data: response,
                message: 'Contract created successfully'
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error creating contract'
            });
        }
    }
    // GET /contracts/:id - Get contract by ID
    async getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid contract ID'
                });
                return;
            }
            const contract = await this.getContractById.execute(id);
            if (!contract) {
                res.status(404).json({
                    success: false,
                    message: 'Contract not found'
                });
                return;
            }
            const response = dtos_1.ContractResponseDto.fromDomain(contract);
            res.status(200).json({
                success: true,
                data: response,
                message: 'Contract retrieved successfully'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving contract',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    // PUT /contracts/:id - Update contract
    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid contract ID'
                });
                return;
            }
            const dto = dtos_1.UpdateContractDto.fromRequest(req.body);
            const contract = await this.updateContract.execute(id, dto);
            const response = dtos_1.ContractResponseDto.fromDomain(contract);
            res.status(200).json({
                success: true,
                data: response,
                message: 'Contract updated successfully'
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error updating contract'
            });
        }
    }
    // DELETE /contracts/:id - Delete contract
    async delete(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid contract ID'
                });
                return;
            }
            await this.deleteContract.execute(id);
            res.status(200).json({
                success: true,
                message: 'Contract deleted successfully'
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error deleting contract'
            });
        }
    }
}
exports.ContractController = ContractController;

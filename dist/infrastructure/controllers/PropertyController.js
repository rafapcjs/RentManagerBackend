"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const GetAllProperties_1 = require("../../domain/usecases/Property/GetAllProperties");
const GetPropertyById_1 = require("../../domain/usecases/Property/GetPropertyById");
const CreateProperty_1 = require("../../domain/usecases/Property/CreateProperty");
const UpdateProperty_1 = require("../../domain/usecases/Property/UpdateProperty");
const DeleteProperty_1 = require("../../domain/usecases/Property/DeleteProperty");
const dtos_1 = require("../../application/dtos");
class PropertyController {
    constructor(propertyRepository) {
        this.getAllProperties = new GetAllProperties_1.GetAllProperties(propertyRepository);
        this.getPropertyById = new GetPropertyById_1.GetPropertyById(propertyRepository);
        this.createProperty = new CreateProperty_1.CreateProperty(propertyRepository);
        this.updateProperty = new UpdateProperty_1.UpdateProperty(propertyRepository);
        this.deleteProperty = new DeleteProperty_1.DeleteProperty(propertyRepository);
    }
    // GET /properties - Obtener todas las propiedades con paginación
    async getAll(req, res) {
        try {
            const paginationOptions = req.pagination;
            const result = await this.getAllProperties.execute(paginationOptions);
            // Convertir a DTOs de respuesta
            const responseDto = dtos_1.PaginatedResponseDto.fromPaginatedResult(result, (property) => dtos_1.PropertyResponseDto.fromDomain(property));
            res.status(200).json({
                success: true,
                ...responseDto.toJSON(),
                message: 'Properties retrieved successfully'
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error retrieving properties',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    // GET /properties/:id - Obtener propiedad por ID
    async getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid property ID'
                });
                return;
            }
            const property = await this.getPropertyById.execute(id);
            if (!property) {
                res.status(404).json({
                    success: false,
                    message: `Property with ID ${id} not found`
                });
                return;
            }
            // Convertir a DTO de respuesta
            const responseDto = dtos_1.PropertyResponseDto.fromDomain(property);
            res.status(200).json({
                success: true,
                data: responseDto.toJSON(),
                message: 'Property retrieved successfully'
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error retrieving property',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    // POST /properties - Crear una nueva propiedad
    async create(req, res) {
        try {
            // Validar el DTO de entrada
            const createDto = dtos_1.CreatePropertyDto.fromRequest(req.body);
            const property = await this.createProperty.execute(createDto);
            // Convertir a DTO de respuesta
            const responseDto = dtos_1.PropertyResponseDto.fromDomain(property);
            res.status(201).json({
                success: true,
                data: responseDto.toJSON(),
                message: 'Property created successfully'
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error creating property',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    // PUT /properties/:id - Actualizar propiedad
    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid property ID'
                });
                return;
            }
            // Validar el DTO de entrada
            const updateDto = dtos_1.UpdatePropertyDto.fromRequest(req.body);
            const updatedProperty = await this.updateProperty.execute(id, updateDto);
            // Convertir a DTO de respuesta
            const responseDto = dtos_1.PropertyResponseDto.fromDomain(updatedProperty);
            res.status(200).json({
                success: true,
                data: responseDto.toJSON(),
                message: 'Property updated successfully'
            });
        }
        catch (error) {
            const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 400;
            res.status(statusCode).json({
                success: false,
                message: 'Error updating property',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    // DELETE /properties/:id - Eliminar propiedad
    async delete(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid property ID'
                });
                return;
            }
            await this.deleteProperty.execute(id);
            res.status(200).json({
                success: true,
                message: 'Property deleted successfully'
            });
        }
        catch (error) {
            const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 400;
            res.status(statusCode).json({
                success: false,
                message: 'Error deleting property',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}
exports.PropertyController = PropertyController;

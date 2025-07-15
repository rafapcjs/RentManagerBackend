import { Request, Response } from 'express';
import { GetAllProperties } from '../../domain/usecases/Property/GetAllProperties';
import { GetPropertyById } from '../../domain/usecases/Property/GetPropertyById';
import { CreateProperty } from '../../domain/usecases/Property/CreateProperty';
import { UpdateProperty } from '../../domain/usecases/Property/UpdateProperty';
import { DeleteProperty } from '../../domain/usecases/Property/DeleteProperty';
import { IPropertyRepository } from '../../interfaces/repositories/IPropertyRepository';
import { 
  CreatePropertyDto, 
  UpdatePropertyDto, 
  PropertyResponseDto, 
  PaginatedResponseDto 
} from '../../application/dtos';

export class PropertyController {
  private getAllProperties: GetAllProperties;
  private getPropertyById: GetPropertyById;
  private createProperty: CreateProperty;
  private updateProperty: UpdateProperty;
  private deleteProperty: DeleteProperty;

  constructor(propertyRepository: IPropertyRepository) {
    this.getAllProperties = new GetAllProperties(propertyRepository);
    this.getPropertyById = new GetPropertyById(propertyRepository);
    this.createProperty = new CreateProperty(propertyRepository);
    this.updateProperty = new UpdateProperty(propertyRepository);
    this.deleteProperty = new DeleteProperty(propertyRepository);
  }

  // GET /properties - Obtener todas las propiedades con paginación
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const paginationOptions = req.pagination;
      const result = await this.getAllProperties.execute(paginationOptions);
      
      // Convertir a DTOs de respuesta
      const responseDto = PaginatedResponseDto.fromPaginatedResult(
        result,
        (property: any) => PropertyResponseDto.fromDomain(property)
      );
      
      res.status(200).json({
        success: true,
        ...responseDto.toJSON(),
        message: 'Properties retrieved successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error retrieving properties',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // GET /properties/:id - Obtener propiedad por ID
  async getById(req: Request, res: Response): Promise<void> {
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
      const responseDto = PropertyResponseDto.fromDomain(property);

      res.status(200).json({
        success: true,
        data: responseDto.toJSON(),
        message: 'Property retrieved successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error retrieving property',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // POST /properties - Crear una nueva propiedad
  async create(req: Request, res: Response): Promise<void> {
    try {
      // Validar el DTO de entrada
      const createDto = CreatePropertyDto.fromRequest(req.body);
      
      const property = await this.createProperty.execute(createDto);
      
      // Convertir a DTO de respuesta
      const responseDto = PropertyResponseDto.fromDomain(property);
      
      res.status(201).json({
        success: true,
        data: responseDto.toJSON(),
        message: 'Property created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error creating property',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // PUT /properties/:id - Actualizar propiedad
  async update(req: Request, res: Response): Promise<void> {
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
      const updateDto = UpdatePropertyDto.fromRequest(req.body);
      
      const updatedProperty = await this.updateProperty.execute(id, updateDto);
      
      // Convertir a DTO de respuesta
      const responseDto = PropertyResponseDto.fromDomain(updatedProperty);
      
      res.status(200).json({
        success: true,
        data: responseDto.toJSON(),
        message: 'Property updated successfully'
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: 'Error updating property',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // DELETE /properties/:id - Eliminar propiedad
  async delete(req: Request, res: Response): Promise<void> {
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
    } catch (error) {
      const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: 'Error deleting property',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

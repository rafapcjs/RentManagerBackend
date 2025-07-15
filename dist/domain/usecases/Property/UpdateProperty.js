"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProperty = void 0;
class UpdateProperty {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id, updateDto) {
        if (!id || id <= 0) {
            throw new Error('Property ID is required and must be a positive number');
        }
        // Verificar que la propiedad existe
        const existingProperty = await this.repo.getById(id);
        if (!existingProperty) {
            throw new Error(`Property with ID ${id} not found`);
        }
        // Las validaciones ya se realizan en el DTO
        // Actualizar la entidad existente con los datos del DTO
        existingProperty.updateFromDto(updateDto);
        const updatedProperty = await this.repo.update(id, existingProperty);
        if (!updatedProperty) {
            throw new Error(`Failed to update property with ID ${id}`);
        }
        return updatedProperty;
    }
}
exports.UpdateProperty = UpdateProperty;

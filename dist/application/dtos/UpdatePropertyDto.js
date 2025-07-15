"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePropertyDto = void 0;
const PropertyConstants_1 = require("../../domain/constants/PropertyConstants");
class UpdatePropertyDto {
    constructor(data) {
        this.direccion = data.direccion?.trim();
        this.tipo = data.tipo;
        this.valor_arriendo = data.valor_arriendo ? parseFloat(data.valor_arriendo) : undefined;
        this.estado = data.estado;
        this.descripcion = data.descripcion?.trim();
        this.codigo_agua = data.codigo_agua?.trim();
        this.codigo_luz = data.codigo_luz?.trim();
        this.codigo_gas = data.codigo_gas?.trim();
    }
    // Factory method para crear desde request HTTP
    static fromRequest(data) {
        const dto = new UpdatePropertyDto(data);
        const errors = dto.validate();
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${errors.join(', ')}`);
        }
        return dto;
    }
    // Validaciones
    validate() {
        const errors = [];
        // Solo validar si los campos están presentes
        if (this.direccion !== undefined) {
            if (typeof this.direccion !== 'string' || this.direccion.trim() === '') {
                errors.push('Address must be a valid string if provided');
            }
            else if (this.direccion.length < 5 || this.direccion.length > 255) {
                errors.push('Address must be between 5 and 255 characters');
            }
        }
        if (this.tipo !== undefined) {
            if (!Object.values(PropertyConstants_1.PropertyType).includes(this.tipo)) {
                errors.push('Property type must be either "casa" or "apartamento"');
            }
        }
        if (this.valor_arriendo !== undefined) {
            if (isNaN(this.valor_arriendo) || this.valor_arriendo <= 0) {
                errors.push('Rent value must be a positive number');
            }
            else if (this.valor_arriendo > 999999999.99) {
                errors.push('Rent value is too large');
            }
        }
        if (this.estado !== undefined) {
            if (!Object.values(PropertyConstants_1.PropertyStatus).includes(this.estado)) {
                errors.push('Status must be either "disponible" or "arrendada"');
            }
        }
        if (this.descripcion !== undefined && this.descripcion.length > 1000) {
            errors.push('Description must not exceed 1000 characters');
        }
        // Validaciones para códigos de servicios (opcionales)
        if (this.codigo_agua !== undefined && this.codigo_agua !== '' &&
            (this.codigo_agua.length < 3 || this.codigo_agua.length > 50)) {
            errors.push('Water service code must be between 3 and 50 characters');
        }
        if (this.codigo_luz !== undefined && this.codigo_luz !== '' &&
            (this.codigo_luz.length < 3 || this.codigo_luz.length > 50)) {
            errors.push('Electricity service code must be between 3 and 50 characters');
        }
        if (this.codigo_gas !== undefined && this.codigo_gas !== '' &&
            (this.codigo_gas.length < 3 || this.codigo_gas.length > 50)) {
            errors.push('Gas service code must be between 3 and 50 characters');
        }
        return errors;
    }
    // Método para convertir a objeto plano para el dominio
    toDomain() {
        const result = {};
        if (this.direccion !== undefined)
            result.direccion = this.direccion;
        if (this.tipo !== undefined)
            result.tipo = this.tipo;
        if (this.valor_arriendo !== undefined)
            result.valor_arriendo = this.valor_arriendo;
        if (this.estado !== undefined)
            result.estado = this.estado;
        if (this.descripcion !== undefined)
            result.descripcion = this.descripcion;
        if (this.codigo_agua !== undefined)
            result.codigo_agua = this.codigo_agua;
        if (this.codigo_luz !== undefined)
            result.codigo_luz = this.codigo_luz;
        if (this.codigo_gas !== undefined)
            result.codigo_gas = this.codigo_gas;
        return result;
    }
}
exports.UpdatePropertyDto = UpdatePropertyDto;

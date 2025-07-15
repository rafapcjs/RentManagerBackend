"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = exports.PropertyStatus = exports.PropertyType = void 0;
const PropertyConstants_1 = require("../constants/PropertyConstants");
var PropertyConstants_2 = require("../constants/PropertyConstants");
Object.defineProperty(exports, "PropertyType", { enumerable: true, get: function () { return PropertyConstants_2.PropertyType; } });
Object.defineProperty(exports, "PropertyStatus", { enumerable: true, get: function () { return PropertyConstants_2.PropertyStatus; } });
class Property {
    constructor(direccion, tipo, valor_arriendo, estado = PropertyConstants_1.PropertyStatus.DISPONIBLE, descripcion, codigo_agua, codigo_luz, codigo_gas, createdAt, updatedAt, id) {
        this.direccion = direccion;
        this.tipo = tipo;
        this.valor_arriendo = valor_arriendo;
        this.estado = estado;
        this.descripcion = descripcion;
        this.codigo_agua = codigo_agua;
        this.codigo_luz = codigo_luz;
        this.codigo_gas = codigo_gas;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.id = id;
    }
    // Método estático para crear desde DTO
    static fromCreateDto(dto) {
        return new Property(dto.direccion, dto.tipo, dto.valor_arriendo, dto.estado || PropertyConstants_1.PropertyStatus.DISPONIBLE, dto.descripcion, dto.codigo_agua, dto.codigo_luz, dto.codigo_gas, new Date(), new Date());
    }
    // Método para actualizar desde DTO
    updateFromDto(dto) {
        if (dto.direccion !== undefined) {
            this.direccion = dto.direccion;
        }
        if (dto.tipo !== undefined) {
            this.tipo = dto.tipo;
        }
        if (dto.valor_arriendo !== undefined) {
            this.valor_arriendo = dto.valor_arriendo;
        }
        if (dto.estado !== undefined) {
            this.estado = dto.estado;
        }
        if (dto.descripcion !== undefined) {
            this.descripcion = dto.descripcion;
        }
        if (dto.codigo_agua !== undefined) {
            this.codigo_agua = dto.codigo_agua;
        }
        if (dto.codigo_luz !== undefined) {
            this.codigo_luz = dto.codigo_luz;
        }
        if (dto.codigo_gas !== undefined) {
            this.codigo_gas = dto.codigo_gas;
        }
        this.updatedAt = new Date();
    }
}
exports.Property = Property;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyResponseDto = void 0;
class PropertyResponseDto {
    constructor(data) {
        this.id = data.id;
        this.direccion = data.direccion;
        this.tipo = data.tipo;
        this.valor_arriendo = data.valor_arriendo;
        this.estado = data.estado;
        this.descripcion = data.descripcion;
        this.codigo_agua = data.codigo_agua;
        this.codigo_luz = data.codigo_luz;
        this.codigo_gas = data.codigo_gas;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
    // Método estático para crear desde entidad de dominio
    static fromDomain(property) {
        return new PropertyResponseDto({
            id: property.id,
            direccion: property.direccion,
            tipo: property.tipo,
            valor_arriendo: property.valor_arriendo,
            estado: property.estado,
            descripcion: property.descripcion,
            codigo_agua: property.codigo_agua,
            codigo_luz: property.codigo_luz,
            codigo_gas: property.codigo_gas,
            createdAt: property.createdAt,
            updatedAt: property.updatedAt
        });
    }
    // Convertir a objeto plano para JSON
    toJSON() {
        return {
            id: this.id,
            direccion: this.direccion,
            tipo: this.tipo,
            valor_arriendo: this.valor_arriendo,
            estado: this.estado,
            descripcion: this.descripcion,
            codigo_agua: this.codigo_agua,
            codigo_luz: this.codigo_luz,
            codigo_gas: this.codigo_gas,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
exports.PropertyResponseDto = PropertyResponseDto;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProperty = void 0;
const Property_1 = require("../../entities/Property");
class CreateProperty {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(createDto) {
        // Las validaciones ya se realizan en el DTO
        // Crear entidad de dominio desde el DTO
        const property = Property_1.Property.fromCreateDto(createDto);
        return this.repo.create(property);
    }
}
exports.CreateProperty = CreateProperty;

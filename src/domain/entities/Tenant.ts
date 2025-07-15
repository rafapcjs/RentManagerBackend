
export class Tenant {
    constructor(
        public dni: string,        // DNI como clave de negocio
        public fullName: string,
        public numberPhone: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public id?: number         // ID generado automáticamente por la DB
    ) {}

    // Método estático para crear desde DTO
    static fromCreateDto(dto: any): Tenant {
        return new Tenant(
            dto.dni,
            dto.fullName,
            dto.numberPhone,
            new Date(),
            new Date()
            // ID será null/undefined hasta que se guarde en la DB
        );
    }

    // Método para actualizar desde DTO
    updateFromDto(dto: any): void {
        if (dto.fullName !== undefined) {
            this.fullName = dto.fullName;
        }
        if (dto.numberPhone !== undefined) {
            this.numberPhone = dto.numberPhone;
        }
        this.updatedAt = new Date();
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
class Contract {
    constructor(dni, property_id, start_date, end_date, monthly_value, active = true, images, createdAt, updatedAt, id, tenant, property) {
        this.dni = dni;
        this.property_id = property_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.monthly_value = monthly_value;
        this.active = active;
        this.images = images;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.id = id;
        this.tenant = tenant;
        this.property = property;
    }
    // Static method to create from DTO
    static fromCreateDto(dto) {
        return new Contract(dto.dni, dto.property_id, new Date(dto.start_date), new Date(dto.end_date), dto.monthly_value, dto.active !== undefined ? dto.active : true, dto.images || [], new Date(), new Date());
    }
    // Method to update from DTO
    updateFromDto(dto) {
        if (dto.start_date !== undefined) {
            this.start_date = new Date(dto.start_date);
        }
        if (dto.end_date !== undefined) {
            this.end_date = new Date(dto.end_date);
        }
        if (dto.monthly_value !== undefined) {
            this.monthly_value = dto.monthly_value;
        }
        if (dto.active !== undefined) {
            this.active = dto.active;
        }
        if (dto.images !== undefined) {
            this.images = dto.images;
        }
        this.updatedAt = new Date();
    }
    // Method to validate dates
    validateDates() {
        const errors = [];
        if (this.start_date >= this.end_date) {
            errors.push('Start date must be before end date');
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (this.end_date < today) {
            errors.push('End date cannot be in the past');
        }
        return errors;
    }
    // Method to check if contract is active
    isActive() {
        const today = new Date();
        return this.active && this.start_date <= today && this.end_date >= today;
    }
    // Method to calculate remaining days
    getDaysRemaining() {
        const today = new Date();
        const diffTime = this.end_date.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
}
exports.Contract = Contract;

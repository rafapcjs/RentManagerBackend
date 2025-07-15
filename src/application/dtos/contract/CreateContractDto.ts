// DTO for creating a new contract
export class CreateContractDto {
  dni!: string;
  propertyId!: number;
  startDate!: string; // ISO date string
  endDate!: string; // ISO date string
  monthlyValue!: number;
  active?: boolean;
  images?: string[];

  constructor(data: any) {
    this.dni = data.dni?.trim();
    this.propertyId = data.property_id || data.propertyId;
    this.startDate = data.start_date || data.startDate;
    this.endDate = data.end_date || data.endDate;
    this.monthlyValue = data.monthly_value || data.monthlyValue;
    this.active = data.active !== undefined ? data.active : true;
    this.images = data.images || [];
  }

  // Factory method to create from HTTP request
  static fromRequest(data: any): CreateContractDto {
    const dto = new CreateContractDto(data);
    const errors = dto.validate();
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    
    return dto;
  }

  // Validation method
  validate(): string[] {
    const errors: string[] = [];

    if (!this.dni || this.dni.trim() === '') {
      errors.push('DNI is required');
    }

    if (!this.propertyId || this.propertyId <= 0) {
      errors.push('Property ID is required and must be positive');
    }

    if (!this.startDate) {
      errors.push('Start date is required');
    } else {
      const startDate = new Date(this.startDate);
      if (isNaN(startDate.getTime())) {
        errors.push('Start date must be a valid date');
      }
    }

    if (!this.endDate) {
      errors.push('End date is required');
    } else {
      const endDate = new Date(this.endDate);
      if (isNaN(endDate.getTime())) {
        errors.push('End date must be a valid date');
      }
    }

    if (this.startDate && this.endDate) {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      if (startDate >= endDate) {
        errors.push('Start date must be before end date');
      }
    }

    if (!this.monthlyValue || this.monthlyValue <= 0) {
      errors.push('Monthly value is required and must be positive');
    }

    if (this.images && this.images.length > 10) {
      errors.push('Maximum 10 images allowed');
    }

    return errors;
  }

  // Convert to domain model data
  toDomain(): any {
    return {
      dni: this.dni,
      property_id: this.propertyId,
      start_date: new Date(this.startDate),
      end_date: new Date(this.endDate),
      monthly_value: this.monthlyValue,
      active: this.active,
      images: this.images
    };
  }
}

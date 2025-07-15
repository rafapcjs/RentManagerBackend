// DTO for updating an existing contract
export class UpdateContractDto {
  startDate?: string;
  endDate?: string;
  monthlyValue?: number;
  active?: boolean;
  images?: string[];

  constructor(data: any) {
    this.startDate = data.start_date || data.startDate;
    this.endDate = data.end_date || data.endDate;
    this.monthlyValue = data.monthly_value || data.monthlyValue;
    this.active = data.active;
    this.images = data.images;
  }

  // Factory method to create from HTTP request
  static fromRequest(data: any): UpdateContractDto {
    const dto = new UpdateContractDto(data);
    const errors = dto.validate();
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    
    return dto;
  }

  // Validation method
  validate(): string[] {
    const errors: string[] = [];

    if (this.startDate !== undefined) {
      const startDate = new Date(this.startDate);
      if (isNaN(startDate.getTime())) {
        errors.push('Start date must be a valid date');
      }
    }

    if (this.endDate !== undefined) {
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

    if (this.monthlyValue !== undefined && this.monthlyValue <= 0) {
      errors.push('Monthly value must be positive');
    }

    if (this.images && this.images.length > 10) {
      errors.push('Maximum 10 images allowed');
    }

    return errors;
  }

  // Convert to domain model data
  toDomain(): any {
    const data: any = {};
    
    if (this.startDate !== undefined) {
      data.start_date = new Date(this.startDate);
    }
    if (this.endDate !== undefined) {
      data.end_date = new Date(this.endDate);
    }
    if (this.monthlyValue !== undefined) {
      data.monthly_value = this.monthlyValue;
    }
    if (this.active !== undefined) {
      data.active = this.active;
    }
    if (this.images !== undefined) {
      data.images = this.images;
    }

    return data;
  }
}

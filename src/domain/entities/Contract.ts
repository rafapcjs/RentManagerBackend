export class Contract {
  constructor(
    public dni: string,
    public property_id: number,
    public start_date: Date,
    public end_date: Date,
    public monthly_value: number,
    public active: boolean = true,
    public images?: string[],
    public createdAt?: Date,
    public updatedAt?: Date,
    public id?: number,
    public tenant?: any,
    public property?: any
  ) {}

  // Static method to create from DTO
  static fromCreateDto(dto: any): Contract {
    return new Contract(
      dto.dni,
      dto.property_id,
      new Date(dto.start_date),
      new Date(dto.end_date),
      dto.monthly_value,
      dto.active !== undefined ? dto.active : true,
      dto.images || [],
      new Date(),
      new Date()
    );
  }

  // Method to update from DTO
  updateFromDto(dto: any): void {
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
  validateDates(): string[] {
    const errors: string[] = [];
    
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
  isActive(): boolean {
    const today = new Date();
    return this.active && this.start_date <= today && this.end_date >= today;
  }

  // Method to calculate remaining days
  getDaysRemaining(): number {
    const today = new Date();
    const diffTime = this.end_date.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}

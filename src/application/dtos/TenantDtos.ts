// DTO for creating a new tenant
export class CreateTenantDto {
  fullName!: string;
  dni!: string;
  numberPhone!: string;

  constructor(data: any) {
    this.fullName = data.fullName?.trim();
    this.dni = data.dni?.trim();
    this.numberPhone = data.numberPhone?.trim();
  }

  // Factory method to create from HTTP request
  static fromRequest(data: any): CreateTenantDto {
    const dto = new CreateTenantDto(data);
    const errors = dto.validate();
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    
    return dto;
  }

  // Validations
  validate(): string[] {
    const errors: string[] = [];

    if (!this.fullName || this.fullName.length < 2) {
      errors.push('Full name is required and must be at least 2 characters long');
    }

    if (this.fullName && this.fullName.length > 100) {
      errors.push('Full name must not exceed 100 characters');
    }

    if (!this.dni || !/^\d{7,10}$/.test(this.dni)) {
      errors.push('DNI is required and must be between 7 and 10 digits');
    }

    if (!this.numberPhone || this.numberPhone.length < 7) {
      errors.push('Phone number is required and must be at least 7 characters long');
    }

    if (this.numberPhone && this.numberPhone.length > 20) {
      errors.push('Phone number must not exceed 20 characters');
    }

    // Validate that name only contains letters, spaces and some special characters
    if (this.fullName && !/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/.test(this.fullName)) {
      errors.push('Full name can only contain letters, spaces, hyphens, and apostrophes');
    }

    // Validate basic phone format
    if (this.numberPhone && !/^[\d\s\-\+\(\)]+$/.test(this.numberPhone)) {
      errors.push('Phone number contains invalid characters');
    }

    return errors;
  }

  // Method to convert to plain object for domain
  toDomain() {
    return {
      fullName: this.fullName,
      dni: this.dni,
      numberPhone: this.numberPhone
    };
  }
}

// DTO for updating an existing tenant
export class UpdateTenantDto {
  fullName?: string;
  numberPhone?: string;

  constructor(data: any) {
    this.fullName = data.fullName?.trim();
    this.numberPhone = data.numberPhone?.trim();
  }

  // Factory method to create from HTTP request
  static fromRequest(data: any): UpdateTenantDto {
    const dto = new UpdateTenantDto(data);
    const errors = dto.validate();
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    
    return dto;
  }

  // Validations
  validate(): string[] {
    const errors: string[] = [];

    if (this.fullName !== undefined) {
      if (!this.fullName || this.fullName.length < 2) {
        errors.push('Full name must be at least 2 characters long');
      }

      if (this.fullName.length > 100) {
        errors.push('Full name must not exceed 100 characters');
      }

      // Validate that name only contains letters, spaces and some special characters
      if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/.test(this.fullName)) {
        errors.push('Full name can only contain letters, spaces, hyphens, and apostrophes');
      }
    }

    if (this.numberPhone !== undefined) {
      if (!this.numberPhone || this.numberPhone.length < 7) {
        errors.push('Phone number must be at least 7 characters long');
      }

      if (this.numberPhone.length > 20) {
        errors.push('Phone number must not exceed 20 characters');
      }

      // Validate basic phone format
      if (!/^[\d\s\-\+\(\)]+$/.test(this.numberPhone)) {
        errors.push('Phone number contains invalid characters');
      }
    }

    return errors;
  }

  // Method to convert to plain object for domain
  toDomain() {
    const data: any = {};
    if (this.fullName !== undefined) data.fullName = this.fullName;
    if (this.numberPhone !== undefined) data.numberPhone = this.numberPhone;
    return data;
  }
}

// DTO for tenant response
export class TenantResponseDto {
  dni!: string;
  fullName!: string;
  numberPhone!: string;
  createdAt!: string;
  updatedAt!: string;

  constructor(data: any) {
    this.dni = data.dni;
    this.fullName = data.fullName;
    this.numberPhone = data.numberPhone;
    this.createdAt = data.createdAt?.toISOString ? data.createdAt.toISOString() : data.createdAt || '';
    this.updatedAt = data.updatedAt?.toISOString ? data.updatedAt.toISOString() : data.updatedAt || '';
  }

  // Factory method to create from domain entity
  static fromDomain(tenant: any): TenantResponseDto {
    return new TenantResponseDto(tenant);
  }

  // Factory method to create array from domain entities
  static fromDomainArray(tenants: any[]): TenantResponseDto[] {
    return tenants.map(tenant => TenantResponseDto.fromDomain(tenant));
  }

  // Convert to JSON object
  toJSON() {
    return {
      dni: this.dni,
      fullName: this.fullName,
      numberPhone: this.numberPhone,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

import { Request, Response, NextFunction } from 'express';

// Validación para parámetros de paginación
export const validatePagination = (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sortBy = req.query.sortBy as string || 'id';
  const sortOrder = (req.query.sortOrder as string)?.toUpperCase() || 'ASC';
  
  const errors: string[] = [];
  
  if (page < 1) {
    errors.push('Page number must be greater than 0');
  }
  
  if (limit < 1 || limit > 100) {
    errors.push('Limit must be between 1 and 100');
  }
  
  if (!['ASC', 'DESC'].includes(sortOrder)) {
    errors.push('Sort order must be ASC or DESC');
  }
  
  // Validar campos permitidos para ordenamiento
  const allowedSortFields = ['id', 'fullName', 'dni', 'numberPhone'];
  if (!allowedSortFields.includes(sortBy)) {
    errors.push(`Sort by must be one of: ${allowedSortFields.join(', ')}`);
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid pagination parameters',
      errors
    });
  }
  
  // Agregar parámetros validados al request
  req.pagination = {
    page,
    limit,
    sortBy,
    sortOrder: sortOrder as 'ASC' | 'DESC'
  };
  
  next();
};

// Validación para crear tenant
export const validateCreateTenant = (req: Request, res: Response, next: NextFunction) => {
  const { fullName, dni, numberPhone } = req.body;
  
  const errors: string[] = [];
  
  if (!fullName || typeof fullName !== 'string' || fullName.trim() === '') {
    errors.push('Full name is required and must be a valid string');
  }
  
  if (!dni || typeof dni !== 'string' || dni.trim() === '') {
    errors.push('DNI is required and must be a valid string');
  }
  
  if (!numberPhone || typeof numberPhone !== 'string' || numberPhone.trim() === '') {
    errors.push('Phone number is required and must be a valid string');
  }
  
  // Validar formato DNI (ejemplo para números)
  if (dni && !/^\d{7,10}$/.test(dni)) {
    errors.push('DNI must be between 7 and 10 digits');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors
    });
  }
  
  next();
};

// Validación para actualizar tenant
export const validateUpdateTenant = (req: Request, res: Response, next: NextFunction) => {
  const { fullName, numberPhone } = req.body;
  
  const errors: string[] = [];
  
  if (fullName !== undefined && (typeof fullName !== 'string' || fullName.trim() === '')) {
    errors.push('Full name must be a valid string if provided');
  }
  
  if (numberPhone !== undefined && (typeof numberPhone !== 'string' || numberPhone.trim() === '')) {
    errors.push('Phone number must be a valid string if provided');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors
    });
  }
  
  next();
};

// Validación de parámetro DNI
export const validateDniParam = (req: Request, res: Response, next: NextFunction) => {
  const { dni } = req.params;
  
  if (!dni || !/^\d{7,10}$/.test(dni)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid DNI format. Must be between 7 and 10 digits'
    });
  }
  
  next();
};

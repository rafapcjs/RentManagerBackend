"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Rental Management API',
            version: '1.0.0',
            description: 'API for tenant and rental management',
            contact: {
                name: 'API Support',
                email: 'support@admiarrendando.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Development server'
            }
        ],
        paths: {
            '/tenants': {
                get: {
                    summary: 'Get all tenants with pagination',
                    tags: ['Tenants'],
                    parameters: [
                        {
                            name: 'page',
                            in: 'query',
                            schema: { type: 'integer', minimum: 1, default: 1 },
                            description: 'Page number',
                            example: 1
                        },
                        {
                            name: 'limit',
                            in: 'query',
                            schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
                            description: 'Number of items per page (maximum 100)',
                            example: 10
                        },
                        {
                            name: 'sortBy',
                            in: 'query',
                            schema: {
                                type: 'string',
                                enum: ['id', 'fullName', 'dni', 'numberPhone'],
                                default: 'id'
                            },
                            description: 'Field to sort by',
                            example: 'fullName'
                        },
                        {
                            name: 'sortOrder',
                            in: 'query',
                            schema: {
                                type: 'string',
                                enum: ['ASC', 'DESC'],
                                default: 'ASC'
                            },
                            description: 'Sort order',
                            example: 'ASC'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Tenants list retrieved successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            data: {
                                                type: 'array',
                                                items: { $ref: '#/components/schemas/Tenant' }
                                            },
                                            pagination: { $ref: '#/components/schemas/PaginationInfo' },
                                            message: { type: 'string', example: 'Tenants retrieved successfully' }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Parámetros de paginación inválidos',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ValidationError' }
                                }
                            }
                        }
                    }
                },
                post: {
                    summary: 'Create new tenant',
                    tags: ['Tenants'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/CreateTenantRequest' }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'Tenant created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            data: { $ref: '#/components/schemas/Tenant' },
                                            message: { type: 'string', example: 'Tenant created successfully' }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Error de validación',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ValidationError' }
                                }
                            }
                        }
                    }
                }
            },
            '/tenants/{dni}': {
                get: {
                    summary: 'Get tenant by DNI',
                    tags: ['Tenants'],
                    parameters: [
                        {
                            name: 'dni',
                            in: 'path',
                            required: true,
                            schema: { type: 'string', pattern: '^\\d{7,10}$' },
                            description: 'Tenant\'s DNI',
                            example: '12345678'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Tenant found',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            data: { $ref: '#/components/schemas/Tenant' },
                                            message: { type: 'string', example: 'Tenant retrieved successfully' }
                                        }
                                    }
                                }
                            }
                        },
                        '404': {
                            description: 'Tenant not found',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/NotFoundError' }
                                }
                            }
                        }
                    }
                },
                put: {
                    summary: 'Update tenant',
                    tags: ['Tenants'],
                    parameters: [
                        {
                            name: 'dni',
                            in: 'path',
                            required: true,
                            schema: { type: 'string', pattern: '^\\d{7,10}$' },
                            description: 'Tenant\'s DNI',
                            example: '12345678'
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/UpdateTenantRequest' }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Tenant updated successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            data: { $ref: '#/components/schemas/Tenant' },
                                            message: { type: 'string', example: 'Tenant updated successfully' }
                                        }
                                    }
                                }
                            }
                        },
                        '404': {
                            description: 'Tenant not found',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/NotFoundError' }
                                }
                            }
                        }
                    }
                },
                delete: {
                    summary: 'Delete tenant',
                    tags: ['Tenants'],
                    parameters: [
                        {
                            name: 'dni',
                            in: 'path',
                            required: true,
                            schema: { type: 'string', pattern: '^\\d{7,10}$' },
                            description: 'Tenant\'s DNI',
                            example: '12345678'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Tenant deleted successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            message: { type: 'string', example: 'Tenant deleted successfully' }
                                        }
                                    }
                                }
                            }
                        },
                        '404': {
                            description: 'Tenant not found',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/NotFoundError' }
                                }
                            }
                        }
                    }
                }
            },
            '/payments': {
                get: {
                    summary: 'Get all payments with pagination',
                    tags: ['Payments'],
                    parameters: [
                        {
                            name: 'page',
                            in: 'query',
                            schema: { type: 'integer', minimum: 1, default: 1 },
                            description: 'Page number'
                        },
                        {
                            name: 'limit',
                            in: 'query',
                            schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
                            description: 'Number of items per page'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Payments retrieved successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            data: {
                                                type: 'array',
                                                items: { $ref: '#/components/schemas/Payment' }
                                            },
                                            pagination: { $ref: '#/components/schemas/PaginationInfo' },
                                            message: { type: 'string', example: 'Payments retrieved successfully' }
                                        }
                                    }
                                }
                            }
                        },
                        '500': {
                            description: 'Server error',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ServerError' }
                                }
                            }
                        }
                    }
                },
                post: {
                    summary: 'Create a new payment',
                    tags: ['Payments'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/CreatePayment' }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'Payment created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            data: { $ref: '#/components/schemas/Payment' },
                                            message: { type: 'string', example: 'Payment created successfully' }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Validation error',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ValidationError' }
                                }
                            }
                        },
                        '500': {
                            description: 'Server error',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ServerError' }
                                }
                            }
                        }
                    }
                }
            },
            '/payments/{id}': {
                get: {
                    summary: 'Get payment by ID',
                    tags: ['Payments'],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'integer' },
                            description: 'Payment ID'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Payment retrieved successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            data: { $ref: '#/components/schemas/Payment' },
                                            message: { type: 'string', example: 'Payment retrieved successfully' }
                                        }
                                    }
                                }
                            }
                        },
                        '404': {
                            description: 'Payment not found',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/NotFoundError' }
                                }
                            }
                        },
                        '500': {
                            description: 'Server error',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ServerError' }
                                }
                            }
                        }
                    }
                }
            },
            '/payments/contract/{contractId}': {
                get: {
                    summary: 'Get payments by contract',
                    tags: ['Payments'],
                    parameters: [
                        {
                            name: 'contractId',
                            in: 'path',
                            required: true,
                            schema: { type: 'integer' },
                            description: 'Contract ID'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Contract payments retrieved successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            data: {
                                                type: 'array',
                                                items: { $ref: '#/components/schemas/Payment' }
                                            },
                                            message: { type: 'string', example: 'Contract payments retrieved successfully' }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Invalid contract ID',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ValidationError' }
                                }
                            }
                        },
                        '500': {
                            description: 'Server error',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ServerError' }
                                }
                            }
                        }
                    }
                }
            },
            '/payments/month': {
                get: {
                    summary: 'Get payments by month',
                    tags: ['Payments'],
                    parameters: [
                        {
                            name: 'mes',
                            in: 'query',
                            schema: { type: 'integer', minimum: 1, maximum: 12 },
                            description: 'Month (defaults to current month)'
                        },
                        {
                            name: 'anio',
                            in: 'query',
                            schema: { type: 'integer', minimum: 2000, maximum: 2100 },
                            description: 'Year (defaults to current year)'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Monthly payments retrieved successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            data: {
                                                type: 'array',
                                                items: { $ref: '#/components/schemas/Payment' }
                                            },
                                            message: { type: 'string', example: 'Monthly payments retrieved successfully' }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Invalid month or year',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ValidationError' }
                                }
                            }
                        },
                        '500': {
                            description: 'Server error',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ServerError' }
                                }
                            }
                        }
                    }
                }
            },
            '/payments/summary/pending': {
                get: {
                    summary: 'Get payment summary with pending information',
                    tags: ['Payments'],
                    parameters: [
                        {
                            name: 'mes',
                            in: 'query',
                            schema: { type: 'integer', minimum: 1, maximum: 12 },
                            description: 'Month (defaults to current month)'
                        },
                        {
                            name: 'anio',
                            in: 'query',
                            schema: { type: 'integer', minimum: 2000, maximum: 2100 },
                            description: 'Year (defaults to current year)'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Payment summary retrieved successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            data: { $ref: '#/components/schemas/PaymentSummary' },
                                            message: { type: 'string', example: 'Payment summary retrieved successfully' }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Invalid month or year',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ValidationError' }
                                }
                            }
                        },
                        '500': {
                            description: 'Server error',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ServerError' }
                                }
                            }
                        }
                    }
                }
            }
        },
        components: {
            schemas: {
                Tenant: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        fullName: { type: 'string', example: 'Juan Carlos Pérez' },
                        dni: { type: 'string', example: '12345678' },
                        numberPhone: { type: 'string', example: '555-1234' }
                    }
                },
                PaginationInfo: {
                    type: 'object',
                    properties: {
                        currentPage: { type: 'integer', example: 1 },
                        totalPages: { type: 'integer', example: 5 },
                        totalItems: { type: 'integer', example: 47 },
                        itemsPerPage: { type: 'integer', example: 10 },
                        hasNextPage: { type: 'boolean', example: true },
                        hasPreviousPage: { type: 'boolean', example: false }
                    }
                },
                CreateTenantRequest: {
                    type: 'object',
                    required: ['fullName', 'dni', 'numberPhone'],
                    properties: {
                        fullName: { type: 'string', example: 'Juan Carlos Pérez' },
                        dni: { type: 'string', example: '12345678' },
                        numberPhone: { type: 'string', example: '555-1234' }
                    }
                },
                UpdateTenantRequest: {
                    type: 'object',
                    properties: {
                        fullName: { type: 'string', example: 'Juan Carlos Pérez González' },
                        numberPhone: { type: 'string', example: '555-5678' }
                    }
                },
                ValidationError: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        message: { type: 'string', example: 'Validation errors' },
                        errors: {
                            type: 'array',
                            items: { type: 'string' },
                            example: ['Full name is required', 'DNI must be between 7 and 10 digits']
                        }
                    }
                },
                NotFoundError: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        message: { type: 'string', example: 'Tenant with DNI 12345678 not found' }
                    }
                },
                Property: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        direccion: { type: 'string', example: 'Calle 123 #45-67, Bogotá' },
                        tipo: {
                            type: 'string',
                            enum: ['casa', 'apartamento'],
                            example: 'apartamento'
                        },
                        valor_arriendo: {
                            type: 'number',
                            format: 'decimal',
                            example: 1500000.00
                        },
                        estado: {
                            type: 'string',
                            enum: ['disponible', 'arrendada'],
                            example: 'disponible'
                        },
                        descripcion: {
                            type: 'string',
                            example: 'Apartamento de 2 habitaciones con vista panorámica'
                        },
                        codigo_agua: {
                            type: 'string',
                            example: 'AGU12345678',
                            description: 'Código del servicio de agua'
                        },
                        codigo_luz: {
                            type: 'string',
                            example: 'LUZ87654321',
                            description: 'Código del servicio de electricidad'
                        },
                        codigo_gas: {
                            type: 'string',
                            example: 'GAS11223344',
                            description: 'Código del servicio de gas'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-01-15T10:30:00Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-01-15T10:30:00Z'
                        }
                    }
                },
                CreateProperty: {
                    type: 'object',
                    required: ['direccion', 'tipo', 'valor_arriendo'],
                    properties: {
                        direccion: {
                            type: 'string',
                            example: 'Calle 123 #45-67, Bogotá',
                            minLength: 5,
                            maxLength: 255
                        },
                        tipo: {
                            type: 'string',
                            enum: ['casa', 'apartamento'],
                            example: 'apartamento'
                        },
                        valor_arriendo: {
                            type: 'number',
                            format: 'decimal',
                            example: 1500000.00,
                            minimum: 0.01
                        },
                        estado: {
                            type: 'string',
                            enum: ['disponible', 'arrendada'],
                            example: 'disponible',
                            default: 'disponible'
                        },
                        descripcion: {
                            type: 'string',
                            example: 'Apartamento de 2 habitaciones con vista panorámica',
                            maxLength: 1000
                        },
                        codigo_agua: {
                            type: 'string',
                            example: 'AGU12345678',
                            description: 'Código del servicio de agua (opcional)',
                            minLength: 3,
                            maxLength: 50
                        },
                        codigo_luz: {
                            type: 'string',
                            example: 'LUZ87654321',
                            description: 'Código del servicio de electricidad (opcional)',
                            minLength: 3,
                            maxLength: 50
                        },
                        codigo_gas: {
                            type: 'string',
                            example: 'GAS11223344',
                            description: 'Código del servicio de gas (opcional)',
                            minLength: 3,
                            maxLength: 50
                        }
                    }
                },
                UpdateProperty: {
                    type: 'object',
                    properties: {
                        direccion: {
                            type: 'string',
                            example: 'Calle 456 #78-90, Medellín',
                            minLength: 5,
                            maxLength: 255
                        },
                        tipo: {
                            type: 'string',
                            enum: ['casa', 'apartamento'],
                            example: 'casa'
                        },
                        valor_arriendo: {
                            type: 'number',
                            format: 'decimal',
                            example: 2000000.00,
                            minimum: 0.01
                        },
                        estado: {
                            type: 'string',
                            enum: ['disponible', 'arrendada'],
                            example: 'arrendada'
                        },
                        descripcion: {
                            type: 'string',
                            example: 'Casa de 3 habitaciones con jardín privado',
                            maxLength: 1000
                        },
                        codigo_agua: {
                            type: 'string',
                            example: 'AGU99887766',
                            description: 'Código del servicio de agua (opcional)',
                            minLength: 3,
                            maxLength: 50
                        },
                        codigo_luz: {
                            type: 'string',
                            example: 'LUZ55443322',
                            description: 'Código del servicio de electricidad (opcional)',
                            minLength: 3,
                            maxLength: 50
                        },
                        codigo_gas: {
                            type: 'string',
                            example: 'GAS77889900',
                            description: 'Código del servicio de gas (opcional)',
                            minLength: 3,
                            maxLength: 50
                        }
                    }
                },
                Payment: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                            description: 'Payment ID'
                        },
                        contract_id: {
                            type: 'integer',
                            example: 15,
                            description: 'Contract ID'
                        },
                        mes: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 12,
                            example: 7,
                            description: 'Payment month (1-12)'
                        },
                        anio: {
                            type: 'integer',
                            minimum: 2000,
                            maximum: 2100,
                            example: 2025,
                            description: 'Payment year'
                        },
                        fecha_pago: {
                            type: 'string',
                            format: 'date',
                            example: '2025-07-15',
                            description: 'Payment date'
                        },
                        valor_pagado: {
                            type: 'number',
                            example: 1200000,
                            description: 'Payment amount in COP'
                        },
                        metodo_pago: {
                            type: 'string',
                            example: 'TRANSFERENCIA',
                            description: 'Payment method',
                            enum: ['EFECTIVO', 'TRANSFERENCIA', 'CHEQUE', 'TARJETA', 'CONSIGNACION', 'NEQUI', 'DAVIPLATA', 'OTRO']
                        },
                        observacion: {
                            type: 'string',
                            example: 'Pago completo del mes de julio',
                            description: 'Payment observation (optional)',
                            maxLength: 500
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-07-15T18:30:00.000Z',
                            description: 'Creation date'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-07-15T18:30:00.000Z',
                            description: 'Last update date'
                        }
                    },
                    required: ['id', 'contract_id', 'mes', 'anio', 'fecha_pago', 'valor_pagado', 'metodo_pago']
                },
                CreatePayment: {
                    type: 'object',
                    properties: {
                        contract_id: {
                            type: 'integer',
                            example: 15,
                            description: 'Contract ID'
                        },
                        mes: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 12,
                            example: 7,
                            description: 'Payment month (1-12)'
                        },
                        anio: {
                            type: 'integer',
                            minimum: 2000,
                            maximum: 2100,
                            example: 2025,
                            description: 'Payment year'
                        },
                        fecha_pago: {
                            type: 'string',
                            format: 'date',
                            example: '2025-07-15',
                            description: 'Payment date'
                        },
                        valor_pagado: {
                            type: 'number',
                            minimum: 0.01,
                            example: 1200000,
                            description: 'Payment amount in COP'
                        },
                        metodo_pago: {
                            type: 'string',
                            example: 'TRANSFERENCIA',
                            description: 'Payment method',
                            maxLength: 50,
                            enum: ['EFECTIVO', 'TRANSFERENCIA', 'CHEQUE', 'TARJETA', 'CONSIGNACION', 'NEQUI', 'DAVIPLATA', 'OTRO']
                        },
                        observacion: {
                            type: 'string',
                            example: 'Pago completo del mes de julio',
                            description: 'Payment observation (optional)',
                            maxLength: 500
                        }
                    },
                    required: ['contract_id', 'mes', 'anio', 'fecha_pago', 'valor_pagado', 'metodo_pago']
                },
                PaymentSummary: {
                    type: 'object',
                    properties: {
                        totalPending: {
                            type: 'number',
                            example: 2400000,
                            description: 'Total pending amount'
                        },
                        totalPaid: {
                            type: 'number',
                            example: 8400000,
                            description: 'Total paid amount'
                        },
                        contractsPending: {
                            type: 'integer',
                            example: 2,
                            description: 'Number of contracts with pending payments'
                        },
                        contractsPaid: {
                            type: 'integer',
                            example: 7,
                            description: 'Number of contracts with payments'
                        },
                        month: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 12,
                            example: 7,
                            description: 'Report month'
                        },
                        year: {
                            type: 'integer',
                            example: 2025,
                            description: 'Report year'
                        }
                    },
                    required: ['totalPending', 'totalPaid', 'contractsPending', 'contractsPaid', 'month', 'year']
                }
            }
        }
    },
    apis: ['./src/infrastructure/routes/*.ts']
};
const specs = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    // Configurar Swagger UI con opciones personalizadas
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs, {
        explorer: true,
        customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info { margin: 20px 0 }
      .swagger-ui .scheme-container { background: #fafafa; padding: 10px; border-radius: 4px; }
    `,
        customSiteTitle: 'Admi Arrendando API Docs',
        swaggerOptions: {
            persistAuthorization: true,
            displayRequestDuration: true,
            filter: true,
            tryItOutEnabled: true
        }
    }));
    // Endpoint to get JSON specification
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    });
    console.log('📚 Interactive Swagger UI available at http://localhost:3000/api-docs');
    console.log('📄 JSON specification at http://localhost:3000/api-docs.json');
};
exports.setupSwagger = setupSwagger;

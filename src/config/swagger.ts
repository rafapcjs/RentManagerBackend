import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Admi Arrendando API',
      version: '1.0.0',
      description: 'API para gestión de inquilinos y arrendamientos',
      contact: {
        name: 'API Support',
        email: 'support@admiarrendando.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desarrollo'
      }
    ],
    paths: {
      '/tenants': {
        get: {
          summary: 'Obtener todos los inquilinos con paginación',
          tags: ['Tenants'],
          parameters: [
            {
              name: 'page',
              in: 'query',
              schema: { type: 'integer', minimum: 1, default: 1 },
              description: 'Número de página',
              example: 1
            },
            {
              name: 'limit',
              in: 'query',
              schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
              description: 'Número de elementos por página (máximo 100)',
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
              description: 'Campo por el cual ordenar',
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
              description: 'Orden de clasificación',
              example: 'ASC'
            }
          ],
          responses: {
            '200': {
              description: 'Lista de inquilinos obtenida exitosamente',
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
          summary: 'Crear nuevo inquilino',
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
              description: 'Inquilino creado exitosamente',
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
          summary: 'Obtener inquilino por DNI',
          tags: ['Tenants'],
          parameters: [
            {
              name: 'dni',
              in: 'path',
              required: true,
              schema: { type: 'string', pattern: '^\\d{7,10}$' },
              description: 'DNI del inquilino',
              example: '12345678'
            }
          ],
          responses: {
            '200': {
              description: 'Inquilino encontrado',
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
              description: 'Inquilino no encontrado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/NotFoundError' }
                }
              }
            }
          }
        },
        put: {
          summary: 'Actualizar inquilino',
          tags: ['Tenants'],
          parameters: [
            {
              name: 'dni',
              in: 'path',
              required: true,
              schema: { type: 'string', pattern: '^\\d{7,10}$' },
              description: 'DNI del inquilino',
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
              description: 'Inquilino actualizado exitosamente',
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
              description: 'Inquilino no encontrado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/NotFoundError' }
                }
              }
            }
          }
        },
        delete: {
          summary: 'Eliminar inquilino',
          tags: ['Tenants'],
          parameters: [
            {
              name: 'dni',
              in: 'path',
              required: true,
              schema: { type: 'string', pattern: '^\\d{7,10}$' },
              description: 'DNI del inquilino',
              example: '12345678'
            }
          ],
          responses: {
            '200': {
              description: 'Inquilino eliminado exitosamente',
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
              description: 'Inquilino no encontrado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/NotFoundError' }
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
        }
      }
    }
  },
  apis: ['./src/infrastructure/routes/*.ts']
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Application) => {
  // Configurar Swagger UI con opciones personalizadas
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
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
  
  // Endpoint para obtener la especificación JSON
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
  
  console.log('📚 Swagger UI interactivo disponible en http://localhost:3000/api-docs');
  console.log('📄 Especificación JSON en http://localhost:3000/api-docs.json');
};

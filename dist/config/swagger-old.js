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
                    summary: 'Obtener todos los inquilinos',
                    tags: ['Tenants'],
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
                                            message: { type: 'string', example: 'Tenants retrieved successfully' }
                                        }
                                    }
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
    // Endpoint para obtener la especificación JSON
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    });
    console.log('📚 Swagger UI interactivo disponible en http://localhost:3000/api-docs');
    console.log('📄 Especificación JSON en http://localhost:3000/api-docs.json');
};
exports.setupSwagger = setupSwagger;
openapi: '3.0.0',
    info;
{
    title: 'Admi Arrendando API',
        version;
    '1.0.0',
        description;
    'API para gestión de inquilinos y arrendamientos',
        contact;
    {
        name: 'API Support',
            email;
        'support@admiarrendando.com';
    }
}
servers: [
    {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desarrollo'
    }
],
    paths;
{
    '/tenants';
    {
        get: {
            summary: 'Obtener todos los inquilinos',
                tags;
            ['Tenants'],
                responses;
            {
                '200';
                {
                    description: 'Lista de inquilinos obtenida exitosamente',
                        content;
                    {
                        'application/json';
                        {
                            schema: {
                                type: 'object',
                                    properties;
                                {
                                    success: {
                                        type: 'boolean', example;
                                        true;
                                    }
                                    data: {
                                        type: 'array',
                                            items;
                                        {
                                            $ref: '#/components/schemas/Tenant';
                                        }
                                    }
                                    message: {
                                        type: 'string', example;
                                        'Tenants retrieved successfully';
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        post: {
            summary: 'Crear nuevo inquilino',
                tags;
            ['Tenants'],
                requestBody;
            {
                required: true,
                    content;
                {
                    'application/json';
                    {
                        schema: {
                            $ref: '#/components/schemas/CreateTenantRequest';
                        }
                    }
                }
            }
            responses: {
                '201';
                {
                    description: 'Inquilino creado exitosamente',
                        content;
                    {
                        'application/json';
                        {
                            schema: {
                                type: 'object',
                                    properties;
                                {
                                    success: {
                                        type: 'boolean', example;
                                        true;
                                    }
                                    data: {
                                        $ref: '#/components/schemas/Tenant';
                                    }
                                    message: {
                                        type: 'string', example;
                                        'Tenant created successfully';
                                    }
                                }
                            }
                        }
                    }
                }
                '400';
                {
                    description: 'Error de validación',
                        content;
                    {
                        'application/json';
                        {
                            schema: {
                                $ref: '#/components/schemas/ValidationError';
                            }
                        }
                    }
                }
            }
        }
    }
    '/tenants/{dni}';
    {
        get: {
            summary: 'Obtener inquilino por DNI',
                tags;
            ['Tenants'],
                parameters;
            [
                {
                    name: 'dni',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', pattern: '^\\d{7,10}$' },
                    description: 'DNI del inquilino'
                }
            ],
                responses;
            {
                '200';
                {
                    description: 'Inquilino encontrado',
                        content;
                    {
                        'application/json';
                        {
                            schema: {
                                type: 'object',
                                    properties;
                                {
                                    success: {
                                        type: 'boolean', example;
                                        true;
                                    }
                                    data: {
                                        $ref: '#/components/schemas/Tenant';
                                    }
                                    message: {
                                        type: 'string', example;
                                        'Tenant retrieved successfully';
                                    }
                                }
                            }
                        }
                    }
                }
                '404';
                {
                    description: 'Inquilino no encontrado',
                        content;
                    {
                        'application/json';
                        {
                            schema: {
                                $ref: '#/components/schemas/NotFoundError';
                            }
                        }
                    }
                }
            }
        }
        put: {
            summary: 'Actualizar inquilino',
                tags;
            ['Tenants'],
                parameters;
            [
                {
                    name: 'dni',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', pattern: '^\\d{7,10}$' },
                    description: 'DNI del inquilino'
                }
            ],
                requestBody;
            {
                required: true,
                    content;
                {
                    'application/json';
                    {
                        schema: {
                            $ref: '#/components/schemas/UpdateTenantRequest';
                        }
                    }
                }
            }
            responses: {
                '200';
                {
                    description: 'Inquilino actualizado exitosamente',
                        content;
                    {
                        'application/json';
                        {
                            schema: {
                                type: 'object',
                                    properties;
                                {
                                    success: {
                                        type: 'boolean', example;
                                        true;
                                    }
                                    data: {
                                        $ref: '#/components/schemas/Tenant';
                                    }
                                    message: {
                                        type: 'string', example;
                                        'Tenant updated successfully';
                                    }
                                }
                            }
                        }
                    }
                }
                '404';
                {
                    description: 'Inquilino no encontrado',
                        content;
                    {
                        'application/json';
                        {
                            schema: {
                                $ref: '#/components/schemas/NotFoundError';
                            }
                        }
                    }
                }
            }
        }
        delete ;
        {
            summary: 'Eliminar inquilino',
                tags;
            ['Tenants'],
                parameters;
            [
                {
                    name: 'dni',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', pattern: '^\\d{7,10}$' },
                    description: 'DNI del inquilino'
                }
            ],
                responses;
            {
                '200';
                {
                    description: 'Inquilino eliminado exitosamente',
                        content;
                    {
                        'application/json';
                        {
                            schema: {
                                type: 'object',
                                    properties;
                                {
                                    success: {
                                        type: 'boolean', example;
                                        true;
                                    }
                                    message: {
                                        type: 'string', example;
                                        'Tenant deleted successfully';
                                    }
                                }
                            }
                        }
                    }
                }
                '404';
                {
                    description: 'Inquilino no encontrado',
                        content;
                    {
                        'application/json';
                        {
                            schema: {
                                $ref: '#/components/schemas/NotFoundError';
                            }
                        }
                    }
                }
            }
        }
    }
}
components: {
    schemas: {
        Tenant: {
            type: 'object',
                properties;
            {
                id: {
                    type: 'integer', example;
                    1;
                }
                fullName: {
                    type: 'string', example;
                    'Juan Carlos Pérez';
                }
                dni: {
                    type: 'string', example;
                    '12345678';
                }
                numberPhone: {
                    type: 'string', example;
                    '555-1234';
                }
            }
        }
        CreateTenantRequest: {
            type: 'object',
                required;
            ['fullName', 'dni', 'numberPhone'],
                properties;
            {
                fullName: {
                    type: 'string', example;
                    'Juan Carlos Pérez';
                }
                dni: {
                    type: 'string', example;
                    '12345678';
                }
                numberPhone: {
                    type: 'string', example;
                    '555-1234';
                }
            }
        }
        UpdateTenantRequest: {
            type: 'object',
                properties;
            {
                fullName: {
                    type: 'string', example;
                    'Juan Carlos Pérez González';
                }
                numberPhone: {
                    type: 'string', example;
                    '555-5678';
                }
            }
        }
        ValidationError: {
            type: 'object',
                properties;
            {
                success: {
                    type: 'boolean', example;
                    false;
                }
                message: {
                    type: 'string', example;
                    'Validation errors';
                }
                errors: {
                    type: 'array',
                        items;
                    {
                        type: 'string';
                    }
                    example: ['Full name is required', 'DNI must be between 7 and 10 digits'];
                }
            }
        }
        NotFoundError: {
            type: 'object',
                properties;
            {
                success: {
                    type: 'boolean', example;
                    false;
                }
                message: {
                    type: 'string', example;
                    'Tenant with DNI 12345678 not found';
                }
            }
        }
    }
}
;
const setupSwagger = (app) => {
    // Endpoint para obtener la documentación JSON
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerDocument);
    });
    // Endpoint simple para mostrar la documentación
    app.get('/api-docs', (req, res) => {
        res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Admi Arrendando API Documentation</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; background-color: #f5f5f5; }
          .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          h1 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
          h2 { color: #555; margin-top: 30px; }
          .endpoint { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #007bff; }
          .method { font-weight: bold; color: white; padding: 4px 8px; border-radius: 3px; font-size: 12px; }
          .get { background-color: #28a745; }
          .post { background-color: #007bff; }
          .put { background-color: #ffc107; color: #000; }
          .delete { background-color: #dc3545; }
          code { background: #e9ecef; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
          .example { background: #e7f3ff; padding: 10px; border-radius: 4px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🏠 Admi Arrendando API</h1>
          <p>API para gestión de inquilinos y arrendamientos</p>
          
          <h2>📋 Endpoints Disponibles</h2>
          
          <div class="endpoint">
            <span class="method get">GET</span> <code>/api/tenants</code>
            <p>Obtiene todos los inquilinos</p>
          </div>
          
          <div class="endpoint">
            <span class="method get">GET</span> <code>/api/tenants/{dni}</code>
            <p>Obtiene un inquilino por su DNI</p>
          </div>
          
          <div class="endpoint">
            <span class="method post">POST</span> <code>/api/tenants</code>
            <p>Crea un nuevo inquilino</p>
            <div class="example">
              <strong>Body ejemplo:</strong><br>
              <code>{"fullName": "Juan Pérez", "dni": "12345678", "numberPhone": "555-1234"}</code>
            </div>
          </div>
          
          <div class="endpoint">
            <span class="method put">PUT</span> <code>/api/tenants/{dni}</code>
            <p>Actualiza un inquilino existente</p>
            <div class="example">
              <strong>Body ejemplo:</strong><br>
              <code>{"fullName": "Juan Carlos Pérez", "numberPhone": "555-5678"}</code>
            </div>
          </div>
          
          <div class="endpoint">
            <span class="method delete">DELETE</span> <code>/api/tenants/{dni}</code>
            <p>Elimina un inquilino</p>
          </div>
          
          <h2>🔧 Herramientas de prueba</h2>
          <p>Puedes probar la API usando:</p>
          <ul>
            <li><strong>Postman:</strong> Importa la especificación desde <code>/api-docs.json</code></li>
            <li><strong>curl:</strong> Ejemplos de comandos disponibles en la documentación</li>
            <li><strong>Thunder Client:</strong> Extensión de VS Code para testing</li>
          </ul>
          
          <h2>📖 Especificación OpenAPI</h2>
          <p>La especificación completa está disponible en: <a href="/api-docs.json">JSON</a></p>
          
          <p><em>Para una experiencia completa de Swagger UI, instala los paquetes:</em></p>
          <code>npm install swagger-ui-express swagger-jsdoc @types/swagger-ui-express @types/swagger-jsdoc</code>
        </div>
      </body>
      </html>
    `);
    });
    console.log('📚 Documentación API disponible en http://localhost:3000/api-docs');
    console.log('📄 Especificación JSON en http://localhost:3000/api-docs.json');
};
exports.setupSwagger = setupSwagger;

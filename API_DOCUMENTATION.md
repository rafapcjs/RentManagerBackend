# 📚 Documentación API - Admi Arrendando

## 🚀 Acceso a la documentación

- **Documentación Web:** http://localhost:3000/api-docs
- **Especificación JSON:** http://localhost:3000/api-docs.json
- **Health Check:** http://localhost:3000/health

## 📋 Endpoints disponibles

### 1. Obtener todos los inquilinos
```http
GET /api/tenants
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "fullName": "Juan Carlos Pérez",
      "dni": "12345678",
      "numberPhone": "555-1234"
    }
  ],
  "message": "Tenants retrieved successfully"
}
```

### 2. Obtener inquilino por DNI
```http
GET /api/tenants/{dni}
```

**Ejemplo:**
```http
GET /api/tenants/12345678
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "fullName": "Juan Carlos Pérez",
    "dni": "12345678",
    "numberPhone": "555-1234"
  },
  "message": "Tenant retrieved successfully"
}
```

**Respuesta no encontrado (404):**
```json
{
  "success": false,
  "message": "Tenant with DNI 12345678 not found"
}
```

### 3. Crear nuevo inquilino
```http
POST /api/tenants
Content-Type: application/json

{
  "fullName": "Juan Carlos Pérez",
  "dni": "12345678",
  "numberPhone": "555-1234"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "fullName": "Juan Carlos Pérez",
    "dni": "12345678",
    "numberPhone": "555-1234"
  },
  "message": "Tenant created successfully"
}
```

**Respuesta error validación (400):**
```json
{
  "success": false,
  "message": "Validation errors",
  "errors": [
    "Full name is required and must be a valid string",
    "DNI must be between 7 and 10 digits"
  ]
}
```

### 4. Actualizar inquilino
```http
PUT /api/tenants/{dni}
Content-Type: application/json

{
  "fullName": "Juan Carlos Pérez González",
  "numberPhone": "555-5678"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "fullName": "Juan Carlos Pérez González",
    "dni": "12345678",
    "numberPhone": "555-5678"
  },
  "message": "Tenant updated successfully"
}
```

### 5. Eliminar inquilino
```http
DELETE /api/tenants/{dni}
```

**Ejemplo:**
```http
DELETE /api/tenants/12345678
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Tenant deleted successfully"
}
```

## 🧪 Ejemplos con cURL

### Obtener todos los inquilinos
```bash
curl -X GET http://localhost:3000/api/tenants
```

### Crear nuevo inquilino
```bash
curl -X POST http://localhost:3000/api/tenants \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "María García",
    "dni": "87654321",
    "numberPhone": "555-9876"
  }'
```

### Obtener inquilino por DNI
```bash
curl -X GET http://localhost:3000/api/tenants/87654321
```

### Actualizar inquilino
```bash
curl -X PUT http://localhost:3000/api/tenants/87654321 \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "María García López",
    "numberPhone": "555-0000"
  }'
```

### Eliminar inquilino
```bash
curl -X DELETE http://localhost:3000/api/tenants/87654321
```

## 🔧 Códigos de estado HTTP

| Código | Descripción |
|--------|-------------|
| `200` | Operación exitosa |
| `201` | Recurso creado exitosamente |
| `400` | Error de validación o petición malformada |
| `404` | Recurso no encontrado |
| `500` | Error interno del servidor |

## 📝 Validaciones

### DNI
- Debe ser una cadena de 7 a 10 dígitos
- Debe ser único en el sistema

### Nombre completo
- Campo obligatorio para crear
- No puede estar vacío

### Teléfono
- Campo obligatorio para crear
- No puede estar vacío

## 🚀 Para una experiencia completa con Swagger UI

Si quieres la interfaz completa de Swagger UI, instala los paquetes:

```bash
npm install swagger-ui-express swagger-jsdoc @types/swagger-ui-express @types/swagger-jsdoc
```

Luego podrás usar la interfaz interactiva completa en `/api-docs`.

## 🛠️ Herramientas recomendadas

- **Postman:** Importa la especificación desde `/api-docs.json`
- **Thunder Client:** Extensión de VS Code
- **Insomnia:** Cliente REST alternativo
- **cURL:** Para testing desde línea de comandos

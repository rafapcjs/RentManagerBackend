# 🏠 AdmiArrendando - Sistema de Gestión de Rentas

## 📋 Descripción

**AdmiArrendando** es una aplicación web desarrollada para la **Familia Corredor Software** que permite administrar y gestionar de manera eficiente el pago de rentas de propiedades inmobiliarias. El sistema facilita el control de inquilinos, propiedades y contratos de arrendamiento de forma amigable y profesional.

## 🎯 Características Principales

- ✅ **Gestión de Inquilinos**: Registro y administración completa de inquilinos
- ✅ **Gestión de Propiedades**: Control de propiedades disponibles y arrendadas
- ✅ **Gestión de Contratos**: Administración de contratos de arrendamiento
- ✅ **Control de Estados**: Seguimiento del estado de propiedades (Disponible, Arrendada, Mantenimiento)
- ✅ **Paginación**: Listados paginados para mejor rendimiento
- ✅ **API REST**: Interfaz completa para integración
- ✅ **Documentación Swagger**: API autodocumentada
- ✅ **Validación de Datos**: DTOs con validación robusta
- ✅ **Arquitectura Limpia**: Separación de responsabilidades

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    ARQUITECTURA LIMPIA                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   PRESENTATION  │    │   APPLICATION   │                │
│  │                 │    │                 │                │
│  │  • Controllers  │◄──►│  • Use Cases    │                │
│  │  • Routes       │    │  • DTOs         │                │
│  │  • Middleware   │    │  • Services     │                │
│  └─────────────────┘    └─────────────────┘                │
│           │                       │                        │
│           ▼                       ▼                        │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │    DOMAIN       │    │ INFRASTRUCTURE  │                │
│  │                 │    │                 │                │
│  │  • Entities     │◄──►│  • Repositories │                │
│  │  • Use Cases    │    │  • TypeORM      │                │
│  │  • Constants    │    │  • Database     │                │
│  └─────────────────┘    └─────────────────┘                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 📁 Estructura de Directorios

```
src/
├── 📂 application/          # Capa de Aplicación
│   ├── dtos/               # Data Transfer Objects
│   │   ├── TenantDtos.ts   # DTOs de Inquilinos
│   │   ├── PropertyDtos.ts # DTOs de Propiedades
│   │   └── ContractDtos.ts # DTOs de Contratos
│   └── services/           # Servicios de Aplicación
│
├── 📂 domain/              # Capa de Dominio
│   ├── entities/           # Entidades del Dominio
│   │   ├── Tenant.ts       # Entidad Inquilino
│   │   ├── Property.ts     # Entidad Propiedad
│   │   └── Contract.ts     # Entidad Contrato
│   ├── usecases/          # Casos de Uso
│   │   ├── Tenant/        # Casos de uso de Inquilinos
│   │   ├── Property/      # Casos de uso de Propiedades
│   │   └── Contract/      # Casos de uso de Contratos
│   └── constants/         # Constantes del Dominio
│
├── 📂 infrastructure/      # Capa de Infraestructura
│   ├── controllers/       # Controladores HTTP
│   ├── repositories/      # Implementación de Repositorios
│   ├── routes/           # Definición de Rutas
│   └── typeorm/          # Entidades ORM
│
├── 📂 interfaces/         # Interfaces y Contratos
│   ├── repositories/     # Interfaces de Repositorios
│   └── common/          # Interfaces Comunes
│
└── 📂 config/            # Configuración
    └── data-source.ts    # Configuración de Base de Datos
```

## 🛠️ Tecnologías Utilizadas

### Backend
- **🟢 Node.js**: Runtime de JavaScript
- **⚡ Express.js**: Framework web minimalista
- **🔷 TypeScript**: Superset de JavaScript con tipado estático
- **🐘 PostgreSQL**: Base de datos relacional
- **🔧 TypeORM**: ORM para TypeScript/JavaScript
- **📚 Swagger**: Documentación automática de API
- **🔍 Reflect Metadata**: Metadatos para decoradores

### Arquitectura y Patrones
- **🏗️ Clean Architecture**: Separación de responsabilidades
- **📦 Repository Pattern**: Abstracción de acceso a datos
- **🎯 Use Cases Pattern**: Lógica de negocio encapsulada
- **📝 DTO Pattern**: Transferencia de datos validada
- **🔄 Dependency Injection**: Inversión de dependencias

### Herramientas de Desarrollo
- **🔥 ts-node-dev**: Desarrollo con recarga automática
- **📦 npm**: Gestor de paquetes
- **🔧 TypeScript Compiler**: Compilación a JavaScript

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v16 o superior)
- PostgreSQL
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone [URL_DEL_REPOSITORIO]
cd admiArrendando
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto:
```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/admiarrendando
PORT=3000
```

### 4. Ejecutar en desarrollo
```bash
npm run dev
```

### 5. Compilar para producción
```bash
npm run build
npm start
```

## 📖 Documentación de la API

Una vez que el servidor esté ejecutándose, la documentación interactiva estará disponible en:

- **Swagger UI**: `http://localhost:3000/api-docs`
- **JSON Spec**: `http://localhost:3000/api-docs.json`

### Endpoints Principales

#### 👥 Inquilinos (Tenants)
- `GET /api/tenants` - Listar inquilinos
- `GET /api/tenants/:id` - Obtener inquilino por ID
- `POST /api/tenants` - Crear nuevo inquilino
- `PUT /api/tenants/:id` - Actualizar inquilino
- `DELETE /api/tenants/:id` - Eliminar inquilino

#### 🏢 Propiedades (Properties)
- `GET /api/properties` - Listar propiedades
- `GET /api/properties/:id` - Obtener propiedad por ID
- `POST /api/properties` - Crear nueva propiedad
- `PUT /api/properties/:id` - Actualizar propiedad
- `DELETE /api/properties/:id` - Eliminar propiedad

#### 📋 Contratos (Contracts)
- `GET /api/contracts` - Listar contratos
- `GET /api/contracts/:id` - Obtener contrato por ID
- `POST /api/contracts` - Crear nuevo contrato
- `PUT /api/contracts/:id` - Actualizar contrato 
- `DELETE /api/contracts/:id` - Eliminar contrato

## 🎨 Características Técnicas

### Validación de Datos
- DTOs con validación robusta
- Métodos de conversión a entidades de dominio
- Factory methods para creación consistente

### Paginación
- Soporte para paginación en todos los listados
- Metadatos de paginación incluidos en respuestas
- Configuración flexible de página y límite

### Manejo de Estados
- Estados predefinidos para propiedades
- Transiciones de estado automáticas en contratos
- Validación de reglas de negocio

### Base de Datos
- Migraciones automáticas con TypeORM
- Relaciones entre entidades
- Índices optimizados para consultas

## 👨‍💻 Desarrollo

### Scripts Disponibles
```bash
npm run dev      # Desarrollo con recarga automática
npm run build    # Compilar TypeScript
npm start        # Ejecutar versión compilada
npm test         # Ejecutar tests (por implementar)
```

### Estructura de Respuesta API
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "message": "Operation completed successfully"
}
```

## 📄 Licencia

Este proyecto es desarrollado exclusivamente para **Familia Corredor Software** y su uso está restringido a los términos acordados.

## 👨‍💻 Desarrollado por

**Familia Corredor Software** - Soluciones tecnológicas personalizadas para gestión inmobiliaria.

---

*Para soporte técnico o consultas, contacta al equipo de desarrollo.*

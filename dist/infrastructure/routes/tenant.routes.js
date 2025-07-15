"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TenantController_1 = require("../controllers/TenantController");
const TenantRepository_1 = require("../repositories/TenantRepository");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = (0, express_1.Router)();
// Crear instancia del repositorio y controlador
const tenantRepository = new TenantRepository_1.TenantRepository();
const tenantController = new TenantController_1.TenantController(tenantRepository);
// Main routes
// GET /api/tenants - Get all tenants with pagination
router.get('/', validation_middleware_1.validatePagination, tenantController.getAll.bind(tenantController));
// GET /api/tenants/:dni - Get tenant by DNI
router.get('/:dni', validation_middleware_1.validateDniParam, tenantController.getByDni.bind(tenantController));
// POST /api/tenants - Create new tenant
router.post('/', validation_middleware_1.validateCreateTenant, tenantController.create.bind(tenantController));
// PUT /api/tenants/:dni - Update tenant
router.put('/:dni', validation_middleware_1.validateDniParam, validation_middleware_1.validateUpdateTenant, tenantController.update.bind(tenantController));
// DELETE /api/tenants/:dni - Delete tenant
router.delete('/:dni', validation_middleware_1.validateDniParam, tenantController.delete.bind(tenantController));
exports.default = router;

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
// Rutas para inquilinos/tenants
// GET /api/tenants - Obtener todos los inquilinos con paginación
router.get('/', validation_middleware_1.validatePagination, async (req, res) => {
    await tenantController.getAll(req, res);
});
// GET /api/tenants/:dni - Obtener inquilino por DNI
router.get('/:dni', validation_middleware_1.validateDniParam, async (req, res) => {
    await tenantController.getByDni(req, res);
});
// POST /api/tenants - Crear nuevo inquilino
router.post('/', validation_middleware_1.validateCreateTenant, async (req, res) => {
    await tenantController.create(req, res);
});
// PUT /api/tenants/:dni - Actualizar inquilino
router.put('/:dni', validation_middleware_1.validateDniParam, validation_middleware_1.validateUpdateTenant, async (req, res) => {
    await tenantController.update(req, res);
});
// DELETE /api/tenants/:dni - Eliminar inquilino
router.delete('/:dni', validation_middleware_1.validateDniParam, async (req, res) => {
    await tenantController.delete(req, res);
});
exports.default = router;

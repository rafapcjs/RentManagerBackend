import { Router } from 'express';
import { TenantController } from '../controllers/TenantController';
import { TenantRepository } from '../repositories/TenantRepository';
import { 
  validateCreateTenant, 
  validateUpdateTenant, 
  validateDniParam,
  validatePagination 
} from '../middleware/validation.middleware';

const router = Router();

// Crear instancia del repositorio y controlador
const tenantRepository = new TenantRepository();
const tenantController = new TenantController(tenantRepository);

// Rutas para inquilinos/tenants
// GET /api/tenants - Obtener todos los inquilinos con paginación
router.get('/', validatePagination, async (req, res) => {
  await tenantController.getAll(req, res);
});

// GET /api/tenants/:dni - Obtener inquilino por DNI
router.get('/:dni', validateDniParam, async (req, res) => {
  await tenantController.getByDni(req, res);
});

// POST /api/tenants - Crear nuevo inquilino
router.post('/', validateCreateTenant, async (req, res) => {
  await tenantController.create(req, res);
});

// PUT /api/tenants/:dni - Actualizar inquilino
router.put('/:dni', validateDniParam, validateUpdateTenant, async (req, res) => {
  await tenantController.update(req, res);
});

// DELETE /api/tenants/:dni - Eliminar inquilino
router.delete('/:dni', validateDniParam, async (req, res) => {
  await tenantController.delete(req, res);
});

export default router;

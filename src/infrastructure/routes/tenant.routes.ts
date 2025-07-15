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

// Main routes
// GET /api/tenants - Get all tenants with pagination
router.get('/', validatePagination, tenantController.getAll.bind(tenantController));

// GET /api/tenants/:dni - Get tenant by DNI
router.get('/:dni', validateDniParam, tenantController.getByDni.bind(tenantController));

// POST /api/tenants - Create new tenant
router.post('/', validateCreateTenant, tenantController.create.bind(tenantController));

// PUT /api/tenants/:dni - Update tenant
router.put('/:dni', validateDniParam, validateUpdateTenant, tenantController.update.bind(tenantController));

// DELETE /api/tenants/:dni - Delete tenant
router.delete('/:dni', validateDniParam, tenantController.delete.bind(tenantController));

export default router;

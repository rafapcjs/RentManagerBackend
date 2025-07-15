import { Router } from 'express';
import tenantRoutes from './tenant.routes';

const router = Router();

// Registrar todas las rutas
router.use('/tenants', tenantRoutes);

export default router;

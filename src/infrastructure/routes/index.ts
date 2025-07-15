import { Router } from 'express';
import tenantRoutes from './tenant.routes';
import propertyRoutes from './property.routes';

const router = Router();

// Registrar todas las rutas
router.use('/tenants', tenantRoutes);
router.use('/properties', propertyRoutes);

export default router;

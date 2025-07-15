import { Router } from 'express';
import tenantRoutes from './tenant.routes';
import propertyRoutes from './property.routes';
import contractRoutes from './contract.routes';

const router = Router();

// Registrar todas las rutas
router.use('/tenants', tenantRoutes);
router.use('/properties', propertyRoutes);
router.use('/contracts', contractRoutes);

export default router;

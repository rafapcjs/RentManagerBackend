import { Router } from 'express';
import tenantRoutes from './tenant.routes';
import propertyRoutes from './property.routes';
import contractRoutes from './contract.routes';
import paymentRoutes from './payment.routes';

const router = Router();

// Registrar todas las rutas
router.use('/tenants', tenantRoutes);
router.use('/properties', propertyRoutes);
router.use('/contracts', contractRoutes);
router.use('/payments', paymentRoutes);

export default router;

import { Router } from 'express';
import { ContractController } from '../controllers/ContractController';
import { ContractRepository } from '../repositories/ContractRepository';
import { TenantRepository } from '../repositories/TenantRepository';
import { PropertyRepository } from '../repositories/PropertyRepository';

const router = Router();

// Instanciar dependencias
const contractRepository = new ContractRepository();
const tenantRepository = new TenantRepository();
const propertyRepository = new PropertyRepository();
const contractController = new ContractController(contractRepository, tenantRepository, propertyRepository);

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateContract:
 *       type: object
 *       required:
 *         - dni
 *         - property_id
 *         - start_date
 *         - end_date
 *         - monthly_value
 *       properties:
 *         dni:
 *           type: string
 *           description: Tenant's DNI (National ID)
 *           example: "12345678"
 *         property_id:
 *           type: integer
 *           description: Property ID
 *           example: 1
 *         start_date:
 *           type: string
 *           format: date
 *           description: Contract start date
 *           example: "2024-01-01"
 *         end_date:
 *           type: string
 *           format: date
 *           description: Contract end date
 *           example: "2024-12-31"
 *         monthly_value:
 *           type: number
 *           description: Monthly rent value
 *           example: 800000
 *         active:
 *           type: boolean
 *           description: Contract status
 *           default: true
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Contract image URLs
 *           example: ["https://example.com/image1.jpg"]
 *     
 *     UpdateContract:
 *       type: object
 *       properties:
 *         start_date:
 *           type: string
 *           format: date
 *           description: New start date
 *           example: "2024-02-01"
 *         end_date:
 *           type: string
 *           format: date
 *           description: New end date
 *           example: "2025-01-31"
 *         monthly_value:
 *           type: number
 *           description: New monthly value
 *           example: 850000
 *         active:
 *           type: boolean
 *           description: New contract status
 *           example: true
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: New image URLs
 *           example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *     
 *     Contract:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del contrato
 *           example: 1
 *         dni:
 *           type: string
 *           description: Tenant's DNI (National ID)
 *           example: "12345678"
 *         property_id:
 *           type: integer
 *           description: Property ID
 *           example: 1
 *         start_date:
 *           type: string
 *           format: date
 *           description: Start date
 *           example: "2024-01-01"
 *         end_date:
 *           type: string
 *           format: date
 *           description: End date
 *           example: "2024-12-31"
 *         monthly_value:
 *           type: number
 *           description: Monthly value
 *           example: 800000
 *         active:
 *           type: boolean
 *           description: Contract status
 *           example: true
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Image URLs
 *           example: ["https://example.com/image1.jpg"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation date
 *           example: "2024-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update date
 *           example: "2024-01-01T00:00:00.000Z"
 *         tenant:
 *           type: object
 *           description: Tenant data
 *           properties:
 *             dni:
 *               type: string
 *               example: "12345678"
 *             fullName:
 *               type: string
 *               example: "Juan Pérez"
 *             numberPhone:
 *               type: string
 *               example: "+57 300 123 4567"
 *         property:
 *           type: object
 *           description: Property data
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             address:
 *               type: string
 *               example: "Calle 123 #45-67"
 *             type:
 *               type: string
 *               example: "apartment"
 *             rent_value:
 *               type: number
 *               example: 800000
 *             status:
 *               type: string
 *               example: "rented"
 *
 * /contracts:
 *   get:
 *     summary: Get all contracts with pagination
 *     tags: [Contracts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Contracts list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contract'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 25
 *                     totalPages:
 *                       type: integer
 *                       example: 3
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error retrieving contracts"
 *   post:
 *     summary: Create a new contract
 *     tags: [Contracts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateContract'
 *     responses:
 *       201:
 *         description: Contract created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Contract'
 *                 message:
 *                   type: string
 *                   example: "Contract created successfully"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation errors: DNI is required"
 *
 * /contracts/{id}:
 *   get:
 *     summary: Get contract by ID
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contract ID
 *     responses:
 *       200:
 *         description: Contract data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Contract'
 *       404:
 *         description: Contract not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Contract not found"
 *       400:
 *         description: Invalid contract ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid contract ID"
 *   put:
 *     summary: Update contract
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contract ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateContract'
 *     responses:
 *       200:
 *         description: Contract updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Contract'
 *                 message:
 *                   type: string
 *                   example: "Contract updated successfully"
 *       400:
 *         description: Validation error or invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error updating contract"
 *       404:
 *         description: Contract not found
 *   delete:
 *     summary: Delete contract
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contract ID
 *     responses:
 *       200:
 *         description: Contract deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Contract deleted successfully"
 *       400:
 *         description: Invalid ID or error deleting
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error deleting contract"
 *       404:
 *         description: Contract not found
 */

// Main routes
router.get('/', contractController.getAll.bind(contractController));
router.get('/:id', contractController.getById.bind(contractController));
router.post('/', contractController.create.bind(contractController));
router.put('/:id', contractController.update.bind(contractController));
router.delete('/:id', contractController.delete.bind(contractController));

export default router;

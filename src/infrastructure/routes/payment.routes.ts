import { Router } from 'express';
import { PaymentController } from '../controllers/PaymentController';

const router = Router();
const paymentController = new PaymentController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Payment ID
 *         contract_id:
 *           type: integer
 *           description: Contract ID
 *         mes:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           description: Payment month
 *         anio:
 *           type: integer
 *           minimum: 2000
 *           maximum: 2100
 *           description: Payment year
 *         fecha_pago:
 *           type: string
 *           format: date
 *           description: Payment date
 *         valor_pagado:
 *           type: number
 *           description: Payment amount
 *         metodo_pago:
 *           type: string
 *           description: Payment method
 *         observacion:
 *           type: string
 *           description: Payment observation
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update date
 *       required:
 *         - id
 *         - contract_id
 *         - mes
 *         - anio
 *         - fecha_pago
 *         - valor_pagado
 *         - metodo_pago
 *     
 *     CreatePayment:
 *       type: object
 *       properties:
 *         contract_id:
 *           type: integer
 *           description: Contract ID
 *         mes:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           description: Payment month
 *         anio:
 *           type: integer
 *           minimum: 2000
 *           maximum: 2100
 *           description: Payment year
 *         fecha_pago:
 *           type: string
 *           format: date
 *           description: Payment date
 *         valor_pagado:
 *           type: number
 *           minimum: 0.01
 *           description: Payment amount
 *         metodo_pago:
 *           type: string
 *           maxLength: 50
 *           description: Payment method
 *         observacion:
 *           type: string
 *           maxLength: 500
 *           description: Payment observation
 *       required:
 *         - contract_id
 *         - mes
 *         - anio
 *         - fecha_pago
 *         - valor_pagado
 *         - metodo_pago
 *     
 *     PaymentSummary:
 *       type: object
 *       properties:
 *         totalPending:
 *           type: number
 *           description: Total pending amount
 *         totalPaid:
 *           type: number
 *           description: Total paid amount
 *         contractsPending:
 *           type: integer
 *           description: Number of contracts with pending payments
 *         contractsPaid:
 *           type: integer
 *           description: Number of contracts with payments
 *         month:
 *           type: integer
 *           description: Report month
 *         year:
 *           type: integer
 *           description: Report year
 *
 * tags:
 *   name: Payments
 *   description: Payment management endpoints
 */

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Payments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payment'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.get('/', (req, res) => paymentController.getAll(req, res));

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *                 message:
 *                   type: string
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.get('/:id', (req, res) => paymentController.getById(req, res));

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePayment'
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *                 message:
 *                   type: string
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/', (req, res) => paymentController.create(req, res));

/**
 * @swagger
 * /api/payments/contract/{contractId}:
 *   get:
 *     summary: Get payments by contract
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: contractId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contract ID
 *     responses:
 *       200:
 *         description: Contract payments retrieved successfully
 *       400:
 *         description: Invalid contract ID
 *       500:
 *         description: Server error
 */
router.get('/contract/:contractId', (req, res) => paymentController.getByContract(req, res));

/**
 * @swagger
 * /api/payments/month:
 *   get:
 *     summary: Get payments by month
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: mes
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Month (defaults to current month)
 *       - in: query
 *         name: anio
 *         schema:
 *           type: integer
 *           minimum: 2000
 *           maximum: 2100
 *         description: Year (defaults to current year)
 *     responses:
 *       200:
 *         description: Monthly payments retrieved successfully
 *       400:
 *         description: Invalid month or year
 *       500:
 *         description: Server error
 */
router.get('/month', (req, res) => paymentController.getByMonth(req, res));

/**
 * @swagger
 * /api/payments/summary/pending:
 *   get:
 *     summary: Get payment summary with pending information
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: mes
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Month (defaults to current month)
 *       - in: query
 *         name: anio
 *         schema:
 *           type: integer
 *           minimum: 2000
 *           maximum: 2100
 *         description: Year (defaults to current year)
 *     responses:
 *       200:
 *         description: Payment summary retrieved successfully
 *       400:
 *         description: Invalid month or year
 *       500:
 *         description: Server error
 */
router.get('/summary/pending', (req, res) => paymentController.getSummaryPending(req, res));

export default router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tenant_routes_1 = __importDefault(require("./tenant.routes"));
const property_routes_1 = __importDefault(require("./property.routes"));
const contract_routes_1 = __importDefault(require("./contract.routes"));
const payment_routes_1 = __importDefault(require("./payment.routes"));
const router = (0, express_1.Router)();
// Registrar todas las rutas
router.use('/tenants', tenant_routes_1.default);
router.use('/properties', property_routes_1.default);
router.use('/contracts', contract_routes_1.default);
router.use('/payments', payment_routes_1.default);
exports.default = router;

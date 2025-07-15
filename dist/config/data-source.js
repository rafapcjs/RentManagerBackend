"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const TenantORM_1 = require("../infrastructure/typeorm/TenantORM");
const PropertyORM_1 = require("../infrastructure/typeorm/PropertyORM");
const ContractORM_1 = require("../infrastructure/typeorm/ContractORM");
const PaymentORM_1 = require("../infrastructure/typeorm/PaymentORM");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true, // Solo para desarrollo
    logging: false,
    entities: [TenantORM_1.TenantORM, PropertyORM_1.PropertyORM, ContractORM_1.ContractORM, PaymentORM_1.PaymentORM],
    ssl: {
        rejectUnauthorized: false
    }
});

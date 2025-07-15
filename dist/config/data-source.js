"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const TentantORM_1 = require("../infrastructure/typeorm/TentantORM");
const PropertyORM_1 = require("../infrastructure/typeorm/PropertyORM");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true, // Solo para desarrollo
    logging: false,
    entities: [TentantORM_1.TentantORM, PropertyORM_1.PropertyORM],
    ssl: {
        rejectUnauthorized: false
    }
});

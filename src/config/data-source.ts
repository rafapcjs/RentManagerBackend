import { DataSource } from 'typeorm';
import { TenantORM } from '../infrastructure/typeorm/TenantORM';
import { PropertyORM } from '../infrastructure/typeorm/PropertyORM';
import { ContractORM } from '../infrastructure/typeorm/ContractORM';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true, // Solo para desarrollo
  logging: false,
  entities: [TenantORM, PropertyORM, ContractORM],
  ssl: {
    rejectUnauthorized: false
  }
});

import { DataSource } from 'typeorm';
import { TenantORM } from '../infrastructure/typeorm/TenantORM';
import { PropertyORM } from '../infrastructure/typeorm/PropertyORM';
import { ContractORM } from '../infrastructure/typeorm/ContractORM';
import { PaymentORM } from '../infrastructure/typeorm/PaymentORM';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true, // Solo para desarrollo
  logging: false,
  entities: [TenantORM, PropertyORM, ContractORM, PaymentORM],
  ssl: {
    rejectUnauthorized: false
  }
});

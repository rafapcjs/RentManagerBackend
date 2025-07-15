import { DataSource } from 'typeorm';
import { TentantORM } from '../infrastructure/typeorm/TentantORM';
import { PropertyORM } from '../infrastructure/typeorm/PropertyORM';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true, // Solo para desarrollo
  logging: false,
  entities: [TentantORM, PropertyORM],
  ssl: {
    rejectUnauthorized: false
  }
});

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PropertyType, PropertyStatus } from '../../domain/constants/PropertyConstants';

@Entity('propiedades')
export class PropertyORM {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  direccion!: string;

  @Column({ 
    type: 'enum', 
    enum: PropertyType,
    default: PropertyType.CASA
  })
  tipo!: PropertyType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor_arriendo!: number;

  @Column({ 
    type: 'enum', 
    enum: PropertyStatus,
    default: PropertyStatus.DISPONIBLE
  })
  estado!: PropertyStatus;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  codigo_agua?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  codigo_luz?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  codigo_gas?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

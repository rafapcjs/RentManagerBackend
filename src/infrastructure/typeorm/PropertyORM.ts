import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum PropertyStatus {
  DISPONIBLE = 'disponible',
  ARRENDADA = 'arrendada'
}

export enum PropertyType {
  CASA = 'casa',
  APARTAMENTO = 'apartamento',
  OFICINA = 'oficina',
  LOCAL = 'local',
  BODEGA = 'bodega'
}

@Entity('propiedades')
export class PropertyORM {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  direccion!: string;

  @Column({ 
    type: 'enum', 
    enum: PropertyType,
    default: PropertyType.APARTAMENTO 
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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

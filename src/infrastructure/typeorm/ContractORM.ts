import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TenantORM } from './TenantORM';
import { PropertyORM } from './PropertyORM';

@Entity('contracts')
export class ContractORM {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 10 })
  dni!: string;

  @Column({ type: 'int' })
  property_id!: number;

  @Column({ type: 'date' })
  start_date!: Date;

  @Column({ type: 'date' })
  end_date!: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monthly_value!: number;

  @Column({ type: 'boolean', default: true })
  active!: boolean;

  @Column({ type: 'json', nullable: true })
  images?: string[]; // Array of image URLs or paths

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relationships
  @ManyToOne(() => TenantORM, { eager: true })
  @JoinColumn({ name: 'dni', referencedColumnName: 'dni' })
  tenant?: TenantORM;

  @ManyToOne(() => PropertyORM, { eager: true })
  @JoinColumn({ name: 'property_id', referencedColumnName: 'id' })
  property?: PropertyORM;
}

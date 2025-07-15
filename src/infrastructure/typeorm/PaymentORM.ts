import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ContractORM } from './ContractORM';

@Entity('pagos')
export class PaymentORM {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'contrato_id' })
  contract_id!: number;

  @Column({ type: 'int' })
  mes!: number;

  @Column({ type: 'int' })
  anio!: number;

  @Column({ type: 'date' })
  fecha_pago!: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor_pagado!: number;

  @Column({ type: 'varchar', length: 50 })
  metodo_pago!: string;

  @Column({ type: 'text', nullable: true })
  observacion?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => ContractORM, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contrato_id' })
  contract!: ContractORM;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('donaciones_monto')
export class DonacionDineroEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  usuario_id!: number;

  @Column({ type: 'int' })
  comedor_id!: number;

  @Column({ type: 'float' })
  monto!: number;

  @Column({ type: 'date' })
  fecha!: Date;
}

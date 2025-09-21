import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('comedores_servicios')
export class ComedorServicioEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  comedor_id!: number;

  @Column({ type: 'int' })
  servicio_id!: number;
}



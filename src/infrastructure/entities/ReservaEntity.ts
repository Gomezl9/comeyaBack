import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reservas')
export class ReservaEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  usuario_id!: number;

  @Column({ type: 'int' })
  comedor_id!: number;

  @Column({ type: 'date' })
  fecha!: string;

  @Column({ type: 'varchar' })
  hora!: string;
  
  @Column({ type: 'int' })
  personas!: number;

  @Column({ type: 'varchar', nullable: true })
  estado?: string;
}



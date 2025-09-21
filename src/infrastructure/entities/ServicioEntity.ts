import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('servicios')
export class ServicioEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  nombre!: string;

  @Column({ type: 'varchar', nullable: true })
  descripcion?: string;
}

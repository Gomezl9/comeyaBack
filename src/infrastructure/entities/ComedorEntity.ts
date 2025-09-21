import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('comedores')
export class ComedorEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  nombre!: string;

  @Column({ type: 'varchar' })
  direccion!: string;

  @Column({ type: 'varchar', nullable: true })
  horarios?: string;

  @Column({ type: 'float', nullable: true })
  latitud?: number;

  @Column({ type: 'float', nullable: true })
  longitud?: number;

  @Column({ type: 'int' })
  creado_por!: number;
}



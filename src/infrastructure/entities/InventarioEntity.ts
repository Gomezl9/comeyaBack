import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ComedorEntity } from "./ComedorEntity";

@Entity("inventario")
export class InventarioEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    nombre!: string;

    @Column({ type: "int" })
    cantidad!: number;

    @Column({ type: 'varchar', length: 50 })
    unidad!: string;

    @Column({ type: "int" })
    comedor_id!: number;

    @ManyToOne(() => ComedorEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "comedor_id" })
    comedor!: ComedorEntity;
}

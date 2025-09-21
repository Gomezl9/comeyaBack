import { Entity, PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn} from "typeorm";
import { UserEntity } from "./UserEntity";           // Ajusta la ruta según tu proyecto
import { InventarioEntity } from "./InventarioEntity";
import { ComedorEntity } from "./ComedorEntity";

@Entity("donaciones_inventario")
export class DonacionInventarioEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "int" })
    usuario_id!: number;

    @Column({ type: "int" })
    inventario_id!: number;

    @Column({ type: "timestamp" })
    fecha!: Date;
}

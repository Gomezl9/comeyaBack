import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { RoleEntity } from "./RoleEntity";
import { UserStatus } from "../../domain/User";

@Entity("usuarios")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  nombre!: string;

  @Column({ type: "varchar", length: 100, unique: true })
  correo!: string;

  @Column({ type: "varchar" })
  contraseña!: string;

  @Column({ type: "int" })
  rol_id!: number;
  
  @Column({
    type: "boolean",
    default: true
  })
  status!: boolean;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: "rol_id" })
  rol!: RoleEntity;
}
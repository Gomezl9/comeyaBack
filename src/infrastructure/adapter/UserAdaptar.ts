import { AppDataSource } from '../config/data-base';
import { UserEntity } from "../entities/UserEntity";
import { User } from "../../domain/User";

export class UserAdpartes {
    private userRepository = AppDataSource.getRepository(UserEntity);

    // Unificamos el mapeo en una sola función privada
    private toDomain(userEntity: UserEntity): User {
        return new User(
            userEntity.id,
            userEntity.nombre,
            userEntity.correo,
            userEntity.contraseña,
            userEntity.rol_id,
            userEntity.status // Aseguramos que el status se mapee aquí
        );
    }

    async createUser(user: { nombre: string, correo: string, contraseña: string, rol_id: number }): Promise<number> {
        const newUser = this.userRepository.create({ ...user, status: true });
        const result = await this.userRepository.save(newUser);
        return result.id;
    }

    async getUserById(id: number): Promise<User | null> {
        const userEntity = await this.userRepository.findOneBy({ id });
        return userEntity ? this.toDomain(userEntity) : null;
    }

    async getUserByEmail(correo: string): Promise<User | null> {
        const userEntity = await this.userRepository.findOne({ where: { correo } });
        return userEntity ? this.toDomain(userEntity) : null;
    }

    async getUserByName(nombre: string): Promise<User | null> {
        const userEntity = await this.userRepository.findOne({ where: { nombre } });
        return userEntity ? this.toDomain(userEntity) : null;
    }

    async getAllUsers(): Promise<User[]> {
        const userEntities = await this.userRepository.find();
        return userEntities.map(userEntity => this.toDomain(userEntity));
    }

    async updateUser(id: number, user: Partial<User>): Promise<boolean> {
        const result = await this.userRepository.update(id, user);
        return result.affected !== undefined && result.affected! > 0;
    }

    async deleteUser(id: number): Promise<boolean> {
        const result = await this.userRepository.delete(id);
        return result.affected !== undefined && result.affected! > 0;
    }
}
import { DataSource, Connection } from 'typeorm';
import dotenv from "dotenv";
import envs from './environment-vars';
import { UserEntity } from '../entities/UserEntity';
import { ReservaEntity } from '../entities/ReservaEntity';
import { InventarioEntity } from '../entities/InventarioEntity';
import { DonacionDineroEntity } from '../entities/DonacionDineroEntity';
import { ComedorEntity } from '../entities/ComedorEntity';
import { ComedorServicioEntity } from '../entities/ComedorServicioEntity';
import { DonacionInventarioEntity } from '../entities/DonacionInventarioEntity';
import { ServicioEntity } from '../entities/ServicioEntity';
import { RoleEntity } from '../entities/RoleEntity';


dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: envs.DB_HOST,
    port: Number(envs.DB_PORT || 5432),
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [
        UserEntity,
        ReservaEntity,
        InventarioEntity,
        DonacionDineroEntity,
        ComedorEntity,
        ComedorServicioEntity,
        DonacionInventarioEntity,
        ServicioEntity,
        RoleEntity
    ]
});

//conexion a la base de datos
export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected successfully");
    }catch (error) {
        console.error("Error connecting to the database", error);
        process.exit(1);
    }
}



/**
Este modulo se encarga de:
    - Cargar las variables desde un archivo .env usando dotenv
    - Validar las variables para asegurarse de que tengan los formatos esperados
    - Exportarlas como un objeto tipado para su uso en la aplicación
 */

import dotenv from 'dotenv';

export type ReturnEnvironmentsVars = {
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    JWT_SECRET: string;
}

type ValidationEnvironmentVars = {
    error: string | undefined;
    value: ReturnEnvironmentsVars;
}

dotenv.config();

// Función para validar variables de entorno
function validateEnvVars(vars: NodeJS.ProcessEnv): ValidationEnvironmentVars {
    const requiredVars = ['PORT', 'DB_HOST', 'DB_USER', 'DB_NAME', 'JWT_SECRET'];
    const missingVars = requiredVars.filter(varName => !vars[varName]);
    
    if (missingVars.length > 0) {
        return {
            error: `Variables de entorno faltantes: ${missingVars.join(', ')}`,
            value: {} as ReturnEnvironmentsVars
        };
    }

    const port = parseInt(vars.PORT || '3000');
    const dbPort = parseInt(vars.DB_PORT || '3306');

    if (isNaN(port)) {
        return {
            error: 'PORT debe ser un número válido',
            value: {} as ReturnEnvironmentsVars
        };
    }

    if (isNaN(dbPort)) {
        return {
            error: 'DB_PORT debe ser un número válido',
            value: {} as ReturnEnvironmentsVars
        };
    }

    return {
        error: undefined,
        value: {
            PORT: port,
            DB_HOST: vars.DB_HOST!,
            DB_PORT: dbPort,
            DB_USER: vars.DB_USER!,
            DB_PASSWORD: vars.DB_PASSWORD || '',
            DB_NAME: vars.DB_NAME!,
            JWT_SECRET: vars.JWT_SECRET!
        }
    };
}
// Función tipo flecha
const loadEnvVars = (): ReturnEnvironmentsVars => {
    const result = validateEnvVars(process.env);
    if (result.error) {
        throw new Error(`Error en las variables de entorno: ${result.error}`);
    }
    return result.value;
}
const envs = loadEnvVars();
export default envs;
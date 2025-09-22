import { UserApplicationService } from "../../application/UserApplicationService";
import { Request, Response } from "express";  // Corregido la importación de response
import { User } from "../../domain/User";
import { RoleController } from "./RoleController";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envs from "../config/environment-vars";

export class UserController {
    private app: UserApplicationService;

    constructor(app: UserApplicationService) {
        this.app = app;
    }
        // Consultar usuario por email usando query parameter
    async getUserByEmailQuery(request: Request, response: Response): Promise<Response> {
        const { email } = request.query;
        if (!email || typeof email !== "string") {
            return response.status(400).json({ message: "Falta el parámetro email" });
        }
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email.trim())) {
            return response.status(400).json({ message: "Correo electrónico no válido" });
        }
        try {
            const user = await this.app.getUserByEmail(email);
            if (!user) {
                return response.status(404).json({ message: "Usuario no encontrado" });
            }
            return response.status(200).json(user);
        } catch (error) {
            return response.status(500).json({ message: "Error en servidor" });
        }
    }

        // Consultar usuario por nombre usando query parameter
        async getUserByNameQuery(request: Request, response: Response): Promise<Response> {
            const { name } = request.query;
            if (!name || typeof name !== "string") {
                return response.status(400).json({ message: "Falta el parámetro name" });
            }
            const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/;
            if (!nameRegex.test(name.trim())) {
                return response.status(400).json({ message: "Nombre no válido" });
            }
            try {
                const user = await this.app.getUserByName(name);
                if (user == null) {
                    return response.status(404).json({ message: "Usuario no encontrado" });
                }
                return response.status(200).json(user);
            } catch (error) {
                return response.status(500).json({ message: "Error en servidor" });
            }
        }
    
    // Registrar un nuevo usuario
    async registerUser(request: Request, response: Response): Promise<Response> {
        const { nombre, correo, contraseña, rol_id } = request.body;
        try {
            // TODA LA LÓGICA DE VALIDACIÓN HA SIDO MOVIDA AL MIDDLEWARE

            // Intentar actualizar si el usuario ya existe
            const existingUser = await this.app.getUserByEmail(correo);
            if (existingUser) {
                return response.status(400).json({ message: "El correo electrónico ya está registrado" });
            }
            const hashedPassword = await bcrypt.hash(contraseña, 10);
            const user = { nombre, correo, contraseña: hashedPassword, rol_id };
            const userId = await this.app.createUser(user);

            return response.status(201).json({ message: "Usuario registrado correctamente", userId });
        } catch (error) {
            return response.status(500).json({ message: "Error en el servidor" });
        }
    }

    // Login y emisión de JWT
    async login(request: Request, response: Response): Promise<Response> {
        const { correo, contraseña } = request.body;

        if (!correo || !contraseña) {
            return response.status(400).json({ message: "Correo y contraseña son requeridos" });
        }
        try {
            const user = await this.app.getUserByEmail(correo);

            if (!user) {
                return response.status(401).json({ message: "Credenciales inválidas" });
            }
            
            if (user.status !== true) {
                return response.status(401).json({ message: "Usuario inactivo" });
            }

            const isValid = await bcrypt.compare(contraseña, user.contraseña);

            if (!isValid) {
                return response.status(401).json({ message: "Credenciales inválidas" });
            }

            const token = jwt.sign(
                { sub: user.id, rol_id: user.rol_id, correo: user.correo },
                envs.JWT_SECRET,
                { expiresIn: "8h" }
            );
            
            return response.status(200).json({ 
                token, 
                user: { id: user.id, nombre: user.nombre, correo: user.correo, rol_id: user.rol_id } 
            });
        } catch (error) {
            console.error("[LOGIN ERROR] Ocurrió un error inesperado en el servidor:", error);
            return response.status(500).json({ message: "Error en el servidor" });
        }
    }

    // Suspender un usuario
    async suspendUser(request: Request, response: Response): Promise<Response> {
        const id = parseInt(request.params.id);
        if (isNaN(id)) {
            return response.status(400).json({ message: "ID no válido" });
        }
        try {
            const success = await this.app.suspendUser(id);
            if (!success) {
                return response.status(404).json({ message: "Usuario no encontrado" });
            }
            return response.status(200).json({ message: "Usuario suspendido correctamente" });
        } catch (error) {
            return response.status(500).json({ message: "Error en servidor" });
        }
    }

    // Obtener todos los usuarios
    async getAllUsers(request: Request, response: Response): Promise<Response> {
        try {
            const users = await this.app.getAllUser();
            return response.status(200).json(users);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: "Error en servidor" });
        }
    }

    // Obtener un usuario por ID
    async getUserById(request: Request, response: Response): Promise<Response> {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return response.status(400).json({ message: "ID no válido" });
            }

            const user = await this.app.getUserById(id);
            if (!user) {
                return response.status(404).json({ message: "Usuario no encontrado" });
            }

            return response.status(200).json(user);
        } catch (error) {
            return response.status(500).json({ message: "Error en servidor" });
        }
    }

    // Actualizar un usuario por ID
    async updateUser(request: Request, response: Response): Promise<Response> {
        const id = parseInt(request.params.id);
        const { nombre, correo, contraseña, rol_id } = request.body;

        if (isNaN(id)) {
            return response.status(400).json({ message: "ID no válido" });
        }

        try {
            // Verificar si el usuario existe
            const existingUser = await this.app.getUserById(id);
            if (!existingUser) {
                return response.status(404).json({ message: "Usuario no encontrado" });
            }

            // Validar campos antes de actualizar
            const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/;
            if (nombre && !nameRegex.test(nombre.trim())) {
                return response.status(400).json({ message: "Error en el nombre: formato inválido" });
            }
            if (correo && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(correo)) {
                return response.status(400).json({ error: "Correo electrónico no válido" });
            }
            if (contraseña && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(contraseña)) {
                return response.status(400).json({
                    error: "La contraseña debe tener entre 6 y 25 caracteres, incluyendo al menos una letra y un número",
                });
            }

            // Validar que el rol_id sea válido si se está actualizando
            if (rol_id && !RoleController.isValidRoleId(rol_id)) {
                return response.status(400).json({ 
                    message: "Rol no válido. Solo se permiten: 1 (Administrador) o 2 (Usuario Común)" 
                });
            }

            let updated: Partial<User> = { nombre, correo, rol_id } as Partial<User>;
            if (contraseña) {
                updated.contraseña = await bcrypt.hash(contraseña, 10);
            }
            const updatedUser = await this.app.updateUser(id, updated);
            return response.status(200).json({ message: "Usuario actualizado correctamente", updatedUser });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: "Error en servidor" });
        }
    }

        // Eliminar un usuario por ID
        async deleteUser(request: Request, response: Response): Promise<Response> {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return response.status(400).json({ message: "ID no válido" });
            }
            try {
                const deleted = await this.app.deleteUser(id);
                if (!deleted) {
                    return response.status(404).json({ message: "Usuario no encontrado" });
                }
                return response.status(200).json({ message: "Usuario eliminado correctamente" });
            } catch (error) {
                return response.status(500).json({ message: "Error en servidor" });
            }
        }
}

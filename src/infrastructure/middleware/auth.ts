import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import envs from "../config/environment-vars";

export interface AuthRequest extends Request {
    user?: { sub: number; rol_id: number; correo: string };
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no provisto" });
    }
    const token = authHeader.substring(7);
    try {
        const payload = jwt.verify(token, envs.JWT_SECRET) as any;
        req.user = { sub: payload.sub, rol_id: payload.rol_id, correo: payload.correo };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
}

export function requireRole(rolesPermitidos: number[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "No autenticado" });
        }
        if (!rolesPermitidos.includes(req.user.rol_id)) {
            return res.status(403).json({ message: "No autorizado" });
        }
        next();
    };
}



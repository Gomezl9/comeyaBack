import type { AuthRequest } from '../src/infrastructure/middleware/auth';
import jwt from 'jsonwebtoken';

// Definir variables de entorno necesarias antes de cargar el middleware
process.env.PORT = process.env.PORT || '3000';
process.env.DB_HOST = process.env.DB_HOST || 'localhost';
process.env.DB_PORT = process.env.DB_PORT || '3306';
process.env.DB_USER = process.env.DB_USER || 'user';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'password';
process.env.DB_NAME = process.env.DB_NAME || 'db';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

// Cargar middleware después de definir envs
const { verifyToken, requireRole } = require('../src/infrastructure/middleware/auth');

function mockResponse() {
	const res: any = {};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
}

function mockNext() {
	return jest.fn();
}

describe('Auth middleware', () => {
	const secret = process.env.JWT_SECRET || 'test-secret';

	it('verifyToken: setea req.user con token válido', () => {
		const payload = { sub: 1, rol_id: 2, correo: 'a@a.com' };
		const token = jwt.sign(payload, secret);
		const req = { headers: { authorization: `Bearer ${token}` } } as unknown as AuthRequest;
		const res = mockResponse();
		const next = mockNext();
		verifyToken(req, res, next);
		expect(req.user).toEqual(payload);
		expect(next).toHaveBeenCalled();
	});

	it('requireRole: permite continuar si el rol está permitido', () => {
		const middleware = requireRole([1, 2]);
		const req = { user: { sub: 1, rol_id: 2, correo: 'a@a.com' } } as AuthRequest;
		const res = mockResponse();
		const next = mockNext();
		middleware(req, res, next);
		expect(next).toHaveBeenCalled();
	});
});

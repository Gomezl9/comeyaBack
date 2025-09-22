import { UserApplicationService } from "../src/application/UserApplicationService";
import { User } from "../src/domain/User";

describe('UserApplicationService.suspendUser', () => {
	it('retorna false si el usuario no existe', async () => {
		const adapter = {
			getUserById: jest.fn().mockResolvedValue(null),
			updateUser: jest.fn(),
		} as any;
		const service = new UserApplicationService(adapter);
		await expect(service.suspendUser(123)).resolves.toBe(false);
	});

	it('suspende al usuario y guarda el cambio', async () => {
		const user = new User(1, 'Juan', 'juan@example.com', 'hash', 1, true);
		const adapter = {
			getUserById: jest.fn().mockResolvedValue(user),
			updateUser: jest.fn().mockResolvedValue(true),
		} as any;
		const service = new UserApplicationService(adapter);
		await expect(service.suspendUser(1)).resolves.toBe(true);
	});
});

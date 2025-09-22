import { User } from "../src/domain/User";

describe('User domain', () => {
	it('está activo por defecto cuando status es undefined', () => {
		const user = new User(1, 'Juan', 'juan@example.com', 'hash', 1);
		expect(user.isActive()).toBe(true);
	});

	it('permite suspender y luego activar', () => {
		const user = new User(1, 'Juan', 'juan@example.com', 'hash', 1, true);
		user.suspend();
		expect(user.isActive()).toBe(false);
		user.activate();
		expect(user.isActive()).toBe(true);
	});
});

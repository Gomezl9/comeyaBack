import { ReservaApplicationService } from '../src/application/ReservaApplicationService';
import { Reserva } from '../src/domain/Reserva';

describe('ReservaApplicationService', () => {
	let service: ReservaApplicationService;

	beforeEach(() => {
		service = new ReservaApplicationService();
	});

	test('create agrega y retorna la reserva', () => {
		const input: Reserva = { id: 1, usuario_id: 1, comedor_id: 1, fecha: new Date() } as unknown as Reserva;
		const created = service.create(input);
		expect(created).toEqual(input);
		expect(service.getAll()).toHaveLength(1);
	});

	test('getById retorna la reserva correcta', () => {
		service.create({ id: 2, usuario_id: 5, comedor_id: 10, fecha: new Date() } as unknown as Reserva);
		const found = service.getById(2);
		expect(found).toBeDefined();
		expect(found?.usuario_id).toBe(5);
	});

	test('update modifica y retorna la reserva', () => {
		service.create({ id: 7, usuario_id: 1, comedor_id: 1, fecha: new Date('2024-01-01') } as unknown as Reserva);
		const updated = service.update(7, { usuario_id: 2 });
		expect(updated).toBeDefined();
		expect(updated?.usuario_id).toBe(2);
	});

	test('delete elimina y retorna true/false', () => {
		service.create({ id: 9, usuario_id: 1, comedor_id: 1, fecha: new Date() } as unknown as Reserva);
		expect(service.delete(9)).toBe(true);
		expect(service.delete(1000)).toBe(false);
	});
});



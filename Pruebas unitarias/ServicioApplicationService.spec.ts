import { ServicioApplicationService } from '../src/application/ServicioApplicationService';
import { Servicio } from '../src/domain/Servicio';

describe('ServicioApplicationService', () => {
	let service: ServicioApplicationService;

	beforeEach(() => {
		service = new ServicioApplicationService();
	});

	test('create agrega y retorna el servicio', () => {
		const input: Servicio = { id: 1, nombre: 'Almuerzo', descripcion: 'Menu diario' } as Servicio;
		const created = service.create(input);
		expect(created).toEqual(input);
		expect(service.getAll()).toHaveLength(1);
	});

	test('getAll retorna lista de servicios', () => {
		expect(service.getAll()).toEqual([]);
		service.create({ id: 1, nombre: 'A', descripcion: 'a' } as Servicio);
		service.create({ id: 2, nombre: 'B', descripcion: 'b' } as Servicio);
		expect(service.getAll()).toHaveLength(2);
	});

	test('getById retorna el servicio correcto', () => {
		service.create({ id: 10, nombre: 'X', descripcion: 'x' } as Servicio);
		const found = service.getById(10);
		expect(found).toBeDefined();
		expect(found?.nombre).toBe('X');
	});

	test('update modifica atributos y retorna el actualizado', () => {
		service.create({ id: 5, nombre: 'Previo', descripcion: 'desc' } as Servicio);
		const updated = service.update(5, { nombre: 'Nuevo' });
		expect(updated).toBeDefined();
		expect(updated?.nombre).toBe('Nuevo');
	});

	test('delete elimina y retorna true/false según exista', () => {
		service.create({ id: 3, nombre: 'S', descripcion: 'd' } as Servicio);
		expect(service.delete(3)).toBe(true);
		expect(service.delete(999)).toBe(false);
	});
});



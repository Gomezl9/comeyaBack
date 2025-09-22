import { ComedorApplicationService } from '../src/application/ComedorApplicationService';

// Mock del adapter con la interfaz mínima usada por el servicio
const mockAdapter = () => ({
	createComedor: jest.fn(async (_data) => 1),
	getcomedorById: jest.fn(async (id: number) => id === 1 ? ({ id: 1, nombre: 'Comedor A', direccion: 'Calle 1' } as any) : null),
	getAllcomedor: jest.fn(async () => ([{ id: 1, nombre: 'Comedor A', direccion: 'Calle 1' }] as any)),
	updatecomedor: jest.fn(async (id: number, _data: any) => id === 1 ? ({ affected: 1 } as any) : null),
	deletecomedor: jest.fn(async (id: number) => id === 1),
});

describe('ComedorApplicationService', () => {
	let service: ComedorApplicationService;
	let adapter: ReturnType<typeof mockAdapter>;

	beforeEach(() => {
		adapter = mockAdapter();
		service = new ComedorApplicationService(adapter as any);
	});

	test('create crea y retorna el comedor consultado', async () => {
		const created = await service.create({ nombre: 'Comedor A', direccion: 'Calle 1' } as any);
		expect(adapter.createComedor).toHaveBeenCalled();
		expect(adapter.getcomedorById).toHaveBeenCalledWith(1);
		expect(created.id).toBe(1);
	});

	test('create lanza error si no se puede recuperar el creado', async () => {
		(adapter.getcomedorById as jest.Mock).mockResolvedValueOnce(null);
		await expect(service.create({ nombre: 'X', direccion: 'Y' } as any)).rejects.toThrow('Error al crear comedor');
	});

	test('getAll retorna comedores desde el adapter', async () => {
		const list = await service.getAll();
		expect(list).toHaveLength(1);
		expect(adapter.getAllcomedor).toHaveBeenCalled();
	});

	test('getById retorna comedor o null', async () => {
		const found = await service.getById(1);
		expect(found?.id).toBe(1);
		const notFound = await service.getById(999);
		expect(notFound).toBeNull();
	});

	test('update retorna entidad tras actualizar o null', async () => {
		const updated = await service.update(1, { nombre: 'Nuevo' });
		expect(adapter.updatecomedor).toHaveBeenCalled();
		expect(updated?.id).toBe(1);
		const noUpdated = await service.update(2, { nombre: 'X' });
		expect(noUpdated).toBeNull();
	});

	test('delete retorna true/false', async () => {
		expect(await service.delete(1)).toBe(true);
		expect(await service.delete(2)).toBe(false);
	});
});



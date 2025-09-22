// src/domain/DonacionInventario.ts
export interface DonacionInventario {
  id: number;
  usuario_id: number;
  inventario_id: number;
  cantidad: number;
  fecha: Date;
}


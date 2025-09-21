// src/domain/DonacionDinero.ts
export interface DonacionDinero {
  id: number;
  usuario_id: number;
  comedor_id: number;
  monto: number;
  fecha: Date;
}

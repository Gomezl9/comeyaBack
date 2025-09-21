// src/domain/Comedor.ts
export interface Comedor {
  id: number;
  nombre: string;
  direccion: string;
  horarios?: string;
  latitud?: number;
  longitud?: number;
  creado_por: number;
}



// src/domain/Reserva.ts
export interface Reserva {
  id: number;
  usuario_id: number;
  comedor_id: number;
  fecha: string; 
  hora: string;  
  personas: number;
  estado?: string;
}



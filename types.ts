
export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  CULTIVOS = 'CULTIVOS',
  INSUMOS = 'INSUMOS',
  PERSONAL = 'PERSONAL',
  RIEGO = 'RIEGO',
  MANTENIMIENTO = 'MANTENIMIENTO',
  EQUIPOS = 'EQUIPOS',
  REPORTES = 'REPORTES',
  CONFIG = 'CONFIG'
}

export interface Crop {
  id: string;
  nombre: string;
  variedad: string;
  fechaPlantacion: string;
  hectareas: number;
  estado: 'Activo' | 'Cosechado' | 'En proceso';
  rendimientoEsperado: number; // kg/ha
}

export interface InputItem {
  id: string;
  nombre: string;
  tipo: 'Fertilizante' | 'Pesticida' | 'Semilla' | 'Otro';
  cantidad: number;
  unidad: string;
  costoUnitario: number;
}

export interface Employee {
  id: string;
  nombre: string;
  cargo: string;
  salario: number;
  fechaContratacion: string;
}

export interface Equipment {
  id: string;
  nombre: string;
  tipo: string;
  estado: 'Operativo' | 'En Reparación' | 'Fuera de Servicio';
  ultimaRevision: string;
}

export interface IrrigationSystem {
  id: string;
  sector: string;
  tipo: 'Goteo' | 'Aspersión' | 'Gravedad';
  estado: 'Activo' | 'Inactivo';
  consumoAgua: number;
}

export interface Maintenance {
  id: string;
  equipoId: string;
  fecha: string;
  descripcion: string;
  costo: number;
}

export interface AppState {
  user: { name: string; role: string } | null;
  crops: Crop[];
  inputs: InputItem[];
  employees: Employee[];
  equipment: Equipment[];
  irrigation: IrrigationSystem[];
  maintenance: Maintenance[];
}

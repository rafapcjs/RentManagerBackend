export enum PaymentMethod {
  EFECTIVO = 'EFECTIVO',
  TRANSFERENCIA = 'TRANSFERENCIA',
  CHEQUE = 'CHEQUE',
  TARJETA = 'TARJETA',
  CONSIGNACION = 'CONSIGNACION',
  NEQUI = 'NEQUI',
  DAVIPLATA = 'DAVIPLATA',
  OTRO = 'OTRO'
}

export const PaymentConstants = {
  MIN_MONTH: 1,
  MAX_MONTH: 12,
  MIN_YEAR: 2000,
  MAX_YEAR: 2100,
  MIN_AMOUNT: 0.01,
  MAX_OBSERVATION_LENGTH: 500,
  MAX_METHOD_LENGTH: 50
} as const;

export const MonthNames = {
  1: 'Enero',
  2: 'Febrero',
  3: 'Marzo',
  4: 'Abril',
  5: 'Mayo',
  6: 'Junio',
  7: 'Julio',
  8: 'Agosto',
  9: 'Septiembre',
  10: 'Octubre',
  11: 'Noviembre',
  12: 'Diciembre'
} as const;

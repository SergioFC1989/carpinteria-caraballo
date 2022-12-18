export const schemaColumnsDocument = ['Unidad', 'Concepto', 'Precio', 'Total'];

export const schemaFormDocument = [
  { field: 'Unidad', key: 'Unidad', type: 'number', width: 'small' },
  { field: 'Precio', key: 'Precio', type: 'number', width: 'small' },
  { field: 'Concepto', key: 'Concepto', type: 'text', width: 'large' },
];

export const schemaFormClient = [
  { field: 'Nombre', key: 'Nombre', type: 'text', width: 'large' },
  { field: 'DNI', key: 'DNI', type: 'text', width: 'medium' },
  { field: 'Direccion', key: 'Direccion', type: 'text', width: 'large' },
  { field: 'Localidad', key: 'Localidad', type: 'text', width: 'large' },
  { field: 'Telefono', key: 'Telefono', type: 'number', width: 'medium' },
];

export const schemaFormDetails = [
  { field: 'Detalle', key: 'Detalle', type: 'text', width: 'large' },
  {
    field: 'IVA',
    key: 'IVA',
    type: 'number',
    width: 'medium',
    max: 21,
  },
];

export const schemaModalRefDoc = [
  { field: 'Referencia', key: 'Referencia', type: 'number', width: 'medium' },
];

export const schemaModalClients = [
  { field: 'Cliente', key: 'Cliente', type: 'select-search', width: 'medium' },
];

export const schemaColumnsClient = [
  'Nombre',
  'DNI',
  'Direccion',
  'Localidad',
  'Telefono',
];

import { atom } from 'recoil';

export const stateTableDocument = atom({
  key: 'stateTableDocument',
  default: [],
});

export const stateTableView = atom({
  key: 'stateTableView',
  default: [],
});

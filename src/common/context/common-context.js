import { atom } from 'recoil';

export const stateIsShow = atom({
  key: 'stateIsShow',
  default: {},
});

export const stateNotification = atom({
  key: 'stateNotification',
  default: {},
});

export const stateAuth = atom({
  key: 'stateAuth',
  default: undefined,
});

export const stateAuthGetGoogle = atom({
  key: 'stateAuthGetGoogle',
  default: undefined,
});

export const stateRefDoc = atom({
  key: 'stateRefDoc',
  default: 0,
});

export const stateHeaderDefault = atom({
  key: 'stateHeaderDefault',
  default: {
    title: 'Bienvenid@!!',
    message: 'La app que te permite trabajar de manera comoda y rapida',
  },
});

export const stateFetchAPI = atom({
  key: 'stateFetchAPI',
  default: [],
});

export const stateFormDocument = atom({
  key: 'stateFormDocument',
  default: [],
});

export const stateFormClient = atom({
  key: 'stateFormClient',
  default: {},
});

export const stateVisibilityForm = atom({
  key: 'stateVisibilityForm',
  default: {
    document: true,
    client: false,
    details: false,
  },
});

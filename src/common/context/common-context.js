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

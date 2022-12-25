import {
  ADD_DOCUMENT,
  GET_DOCUMENT,
  GET_ALL_DOCUMENTS,
  DELETE_DOCUMENT,
  EDIT_DOCUMENT,
} from '../request/firebase-request';

const queryFirestoreAPI = {
  DELETE: {
    DOCUMENT: (url, idFirestore) => DELETE_DOCUMENT(url, idFirestore),
  },
  GET: {
    USER: (key, value) => GET_DOCUMENT('usuarios', key, value),
    DOCUMENTS: (url) => GET_ALL_DOCUMENTS(url),
  },
  POST: {
    USER: (data) => ADD_DOCUMENT('usuarios', data),
    DOCUMENTS: (url, data) => ADD_DOCUMENT(url, data),
  },
  UPDATE: {
    DOCUMENT: (url, idFirestore, data) => EDIT_DOCUMENT(url, idFirestore, data),
  },
};

export default queryFirestoreAPI;

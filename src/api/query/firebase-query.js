import {
  ADD_DOCUMENT,
  GET_DOCUMENT,
  GET_ALL_DOCUMENTS,
} from '../request/firebase-request';

const queryFirestoreAPI = {
  DELETE: {},
  GET: {
    USER: (key, value) => GET_DOCUMENT('usuarios', key, value),
    DOCUMENTS: (url) => GET_ALL_DOCUMENTS(url),
  },
  POST: {
    USER: (data) => ADD_DOCUMENT('usuarios', data),
  },
};

export default queryFirestoreAPI;

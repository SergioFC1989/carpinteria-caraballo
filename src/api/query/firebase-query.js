import { ADD_DOCUMENT, GET_DOCUMENT } from '../request/firebase-request';

const queryFirestoreAPI = {
  delete: {},
  get: {
    user: (key, value) => GET_DOCUMENT('usuarios', key, value),
  },
  post: {
    user: (data) => ADD_DOCUMENT('usuarios', data),
  },
};

export default queryFirestoreAPI;

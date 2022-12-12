import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

export const GET_ALL_DOCUMENTS = async (url) => {
  try {
    const data = [];
    const querySnapshot = await getDocs(collection(db, url));
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const GET_DOCUMENT = async (url, key, value) => {
  try {
    const data = [];
    const ref = collection(db, url);
    const q = query(ref, where(key, '==', value));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const ADD_DOCUMENT = async (url, data = []) =>
  data.forEach((elem) => addDoc(collection(db, url), elem));

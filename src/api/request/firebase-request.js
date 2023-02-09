import {
  addDoc,
  deleteDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase-config';

export const GET_ALL_DOCUMENTS = async (url) => {
  try {
    const data = [];
    const querySnapshot = await getDocs(collection(db, url));
    querySnapshot.forEach((doc) => {
      const getData = doc.data();
      data.push({
        idFirestore: doc.id,
        ...getData,
      });
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
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const ADD_DOCUMENT = async (url, data = []) => {
  const doc = await addDoc(collection(db, url), ...data);
  return doc;
};

export const DELETE_DOCUMENT = async (url, idFirestore) =>
  deleteDoc(doc(db, url, idFirestore));

export const EDIT_DOCUMENT = async (url, idFirestore, data = []) =>
  updateDoc(doc(db, url, idFirestore), data);

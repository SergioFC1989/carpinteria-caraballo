import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCXAAhCod_lkhuBK3Y4NEOmaWAbaCAnNhk',
  authDomain: 'carpinteria-caraballo.firebaseapp.com',
  projectId: 'carpinteria-caraballo',
  storageBucket: 'carpinteria-caraballo.appspot.com',
  messagingSenderId: '770381894798',
  appId: '1:770381894798:web:2026c8e967155d457c65df',
};

const init = initializeApp(firebaseConfig);
export const db = getFirestore(init);
export const auth = getAuth();

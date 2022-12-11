import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../config/firebase-config';

export const provider = new GoogleAuthProvider();
export const onAuthCurrentUser = () => auth.currentUser;
export const onAuthSignOut = () => signOut(auth);

export const onAuthCreateAccount = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
export const onAuthSignInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
export const onAuthSignInWithGoogle = () => signInWithPopup(auth, provider);

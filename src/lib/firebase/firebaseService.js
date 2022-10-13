/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */

import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,
  signInWithPopup, signOut,
} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js';
import {

  addDoc, collection, getFirestore, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove,

} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js';
import { firebaseConfig } from './firebaseConfig.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const firestoreConnection = getFirestore(app);

export const currentUser = {};

export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Autenticaciion con Google
// Popup
export const googleSignIn = () => signInWithPopup(auth, provider);

export const saveUserInfo = (userName, userEmail, userID) => {
  addDoc(collection(firestoreConnection, 'Users'), { userName, userEmail, userID });
};

const db = getFirestore();

// salir de la app y cerrar la session
export const logOut = () => signOut(auth);

// guardar publicacion, correo y uaid
export const savePost = (description, like) => {
  if (currentUser) {
    const email = auth.currentUser.email;
    const uid = auth.currentUser.uid;
    addDoc(collection(db, 'post'), {
      email, uid, description, like: [],
    });
  }
};

export const getPost = () => getDocs(collection(db, 'post'));

export const onGetPost = (callback) => onSnapshot(collection(db, 'post'), callback);

export const deletePost = (id) => deleteDoc(doc(db, 'post', id));

export const getPostOne = (id) => getDoc(doc(db, 'post', id));

export const updatePost = (id, newFields) => updateDoc(doc(db, 'post', id), newFields);

export const updatePostprueva = (id, newFields) => updateDoc(doc(db, 'post', id), newFields);

export const likePost = (idUser, uidDOc) => updateDoc(doc(firestoreConnection, 'post', uidDOc), { like: arrayUnion(idUser) });

export const DeletelikePost = (idUser, uidDOc) => updateDoc(doc(firestoreConnection, 'post', uidDOc), { like: arrayRemove(idUser) });

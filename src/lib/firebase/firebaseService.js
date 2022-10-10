/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */

import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,
  signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js';
import {

  addDoc, collection, getFirestore, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc,

} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js';
import { firebaseConfig } from './firebaseConfig.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const firestoreConnection = getFirestore(app);

// Authentication

// eslint-disable-next-line max-len

export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Authentication with Google
// Popup
export const googleSignIn = () => signInWithPopup(auth, provider);

export const saveUserInfo = (userName, userEmail, userID) => {
  addDoc(collection(firestoreConnection, 'Users'), { userName, userEmail, userID });
};

const db = getFirestore();

export const savePost = (description, like) => {
  addDoc(collection(db, 'post'), { description, like });
};

export const getPost = () => getDocs(collection(db, 'post'));

export const onGetPost = (callback) => onSnapshot(collection(db, 'post'), callback);

export const deletePost = (id) => deleteDoc(doc(db, 'post', id));

export const getPostOne = (id) => getDoc(doc(db, 'post', id));

export const updatePost = (id, newFields) => updateDoc(doc(db, 'post', id), newFields);
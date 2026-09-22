import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
  Auth,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase Configuration from Google Firebase Console (Project: nysax-d0665)
const firebaseConfig = {
  apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY || "AIzaSyDTJ8uf8vPOKmqTJDLzVnnMx8gzkWthAWE",
  authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN || "nysax-d0665.firebaseapp.com",
  projectId: (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID || "nysax-d0665",
  storageBucket: (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET || "nysax-d0665.firebasestorage.app",
  messagingSenderId: (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "504776383791",
  appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID || "1:504776383791:web:afeacb74ad459f1bc6d5da",
  measurementId: (import.meta as any).env?.VITE_FIREBASE_MEASUREMENT_ID || "G-XHTPFD9ZTD",
};

// Initialize or reuse existing Firebase app
const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth: Auth = getAuth(app);

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Initialize Cloud Firestore Database
const db: Firestore = getFirestore(app);

// Initialize Analytics if supported in environment
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

// Executive Administrator Email Rule
export const ADMIN_EMAIL = 'nysaxofficial@gmail.com';

export {
  app,
  auth,
  googleProvider,
  db,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  serverTimestamp,
};

export type { FirebaseUser };

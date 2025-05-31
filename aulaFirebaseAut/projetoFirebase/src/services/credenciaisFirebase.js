// src/services/credenciaisFirebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBO2potPUGZa7aNQD3oXChRlF5_uoY0hJY",
  authDomain: "fir-aut-b75a9.firebaseapp.com",
  projectId: "fir-aut-b75a9",
  storageBucket: "fir-aut-b75a9.firebasestorage.app",
  messagingSenderId: "1091314042109",
  appId: "1:1091314042109:web:c559160597330b0b7b2a94"
};

// Inicializa o App
const appFirebase = initializeApp(firebaseConfig);

// **NOVO**: inicializa e exporta o Firestore
export const db = getFirestore(appFirebase);

// Mantém export default do App (útil caso queira)
export default appFirebase;

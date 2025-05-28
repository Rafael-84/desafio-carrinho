import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDBDjGoG-rzanTjLv-6F9ibu4SpCzNStFc",
  authDomain: "desafio-carrinho.firebaseapp.com",
  projectId: "desafio-carrinho",
  storageBucket: "desafio-carrinho.firebasestorage.app",
  messagingSenderId: "937565635104",
  appId: "1:937565635104:web:f9cab39e34a749d6793245",
  measurementId: "G-XFY1LJLSVF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };



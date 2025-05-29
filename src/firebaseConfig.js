// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBYhq6Zzs1WN2Iw1PP1WpwXIaTLGrEt3zM",
    authDomain: "databaseorendatorlviv2-0.firebase.com",
    projectId: "databaseorendatorlviv2-0",
    storageBucket: "databaseorendatorlviv2-0.GeoFirestore.app",
    messagingSenderId: "221124639158",
    appId: "1:221124639158:web:67c86202dff4c8a9312917",
    measurementId: "G-MWQ773T5LS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
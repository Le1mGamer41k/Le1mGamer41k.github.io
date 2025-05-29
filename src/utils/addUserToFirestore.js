// src/utils/addUserToFirestore.js
import { db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export const addUserToFirestore = async (userId, userData) => {
    try {
        await setDoc(doc(db, 'users', userId), userData);
        console.log('✅ Користувач доданий до Firestore');
    } catch (err) {
        console.error('❌ Помилка при записі у Firestore:', err);
    }
};

import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const ApartmentReviews = ({ apartmentId }) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [text, setText] = useState('');

    // Функція для отримання відгуків з Firestore
    const fetchReviews = async () => {
        try {
            const q = query(collection(db, 'reviews'), where('apartmentId', '==', apartmentId));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => doc.data());
            setReviews(data);
        } catch (error) {
            console.error('Помилка при завантаженні відгуків:', error);
        }
    };

    // Функція для додавання нового відгуку до Firestore
    const submitReview = async () => {
        if (!text.trim() || !user) return;
        try {
            await addDoc(collection(db, 'reviews'), {
                Review: text,
                Gmail: user.email,
                apartmentId,
                createdAt: new Date().toISOString()
            });
            setText('');
            fetchReviews(); // Оновити список відгуків після додавання нового
        } catch (error) {
            console.error('Помилка при додаванні відгуку:', error);
        }
    };

    // Виклик fetchReviews при завантаженні компонента або зміні apartmentId
    useEffect(() => {
        if (user) {
            fetchReviews();
        }
    }, [user, apartmentId]);

    return (
        <div style={{ marginTop: '30px' }}>
            <h3>Відгуки</h3>
            {user ? (
                <>
                    {reviews.map((r, i) => (
                        <div key={i} style={{ marginBottom: '10px' }}>
                            <strong>{r.Gmail}</strong>: {r.Review}
                        </div>
                    ))}
                    <textarea
                        placeholder="Ваш відгук..."
                        value={text}
                        onChange={e => setText(e.target.value)}
                        rows="3"
                        style={{ width: '100%', marginTop: '10px' }}
                    />
                    <button onClick={submitReview}>Залишити відгук</button>
                </>
            ) : (
                <p>🔐 Увійдіть, щоб переглянути та залишити відгук</p>
            )}
        </div>
    );
};

export default ApartmentReviews;

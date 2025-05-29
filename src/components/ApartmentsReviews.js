import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const ApartmentReviews = ({ apartmentId }) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [text, setText] = useState('');

    const fetchReviews = async () => {
        const snapshot = await getDocs(collection(db, 'reviews'));
        const data = snapshot.docs.map(doc => doc.data()).filter(r => r.apartmentId === apartmentId);
        setReviews(data);
    };

    const submitReview = async () => {
        if (!text.trim() || !user) return;
        await addDoc(collection(db, 'reviews'), {
            Review: text,
            Gmail: user.email,
            apartmentId,
            createdAt: new Date().toISOString()
        });
        setText('');
        fetchReviews();
    };

    useEffect(() => {
        if (user) fetchReviews();
    }, [user]);

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

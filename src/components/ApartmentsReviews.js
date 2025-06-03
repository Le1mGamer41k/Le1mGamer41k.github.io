import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ApartmentReviews = ({ apartmentId }) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [text, setText] = useState('');

    const fetchReviews = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/reviews?flatId=${apartmentId}&page=1`
            );
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Помилка при завантаженні відгуків:', error);
        }
    };

    const submitReview = async () => {
        if (!text.trim() || !user) return;

        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Review: text,
                    Gmail: user.email,
                    apartmentId
                })
            });

            setText('');
            fetchReviews();
        } catch (error) {
            console.error('Помилка при надсиланні відгуку:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchReviews();
        }
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

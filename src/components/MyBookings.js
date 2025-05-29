import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchMyBookings = async () => {
            if (!user) return;
            const q = query(collection(db, 'bookings'), where('userEmail', '==', user.email));
            const snapshot = await getDocs(q);
            setBookings(snapshot.docs.map(doc => doc.data()));
        };

        fetchMyBookings();
    }, [user]);

    const downloadBookings = () => {
        if (!bookings.length) return alert('Немає збережених бронювань.');
        const content = bookings.map((b, i) =>
            `Бронювання #${i + 1}:\nEmail: ${b.userEmail}\nКвартира: ${b.apartmentId}\nСтатус: ${b.status}\n`
        ).join('\n');

        const blob = new Blob([content], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'Мої_бронювання.txt';
        a.click();
    };

    return (
        <div className="booking-list">
            <h2>Ваші бронювання</h2>
            <div id="bookings-container">
                {bookings.length === 0 ? (
                    <p>Поки що немає бронювань.</p>
                ) : (
                    bookings.map((b, i) => (
                        <div key={i} className="booking-item">
                            <h3>Бронювання #{i + 1}</h3>
                            <p><strong>Email:</strong> {b.userEmail}</p>
                            <p><strong>Квартира:</strong> {b.apartmentId}</p>
                            <p><strong>Статус:</strong> {b.status}</p>
                            <hr />
                        </div>
                    ))
                )}
            </div>
            <button className="download-button" onClick={downloadBookings}>⬇️ Завантажити бронювання</button>
        </div>
    );
};

export default MyBookings;

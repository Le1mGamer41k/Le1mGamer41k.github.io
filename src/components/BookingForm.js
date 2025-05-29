import React, { useEffect } from 'react';
import '../styles/styles.css';
import '../styles/booking_additional.css';
import { useSearchParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const BookingForm = () => {
    const [params] = useSearchParams();
    const { user } = useAuth();

    useEffect(() => {
        const apt = params.get('apartment');
        if (apt) {
            document.getElementById('apartment').value = apt;
        }
    }, [params]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const apartment = form.apartment.value.trim();

        if (!user) {
            alert("Увійдіть, щоб зробити бронювання.");
            return;
        }

        const booking = {
            name: form.name.value.trim(),
            phone: form.phone.value.trim(),
            message: form.message.value.trim(),
            userEmail: user.email,
            apartmentId: apartment,
            status: "pending",
            createdAt: new Date().toISOString()
        };

        if (!booking.name || !booking.phone) {
            alert("Заповніть усі обов'язкові поля!");
            return;
        }

        await addDoc(collection(db, 'bookings'), booking);
        alert(`Дякуємо, ${booking.name}! Заявка на квартиру "${apartment}" відправлена.`);
        form.reset();
    };

    return (
        <div className="booking-container">
            <h1>Оформлення заявки на оренду</h1>
            <form id="booking-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Ваше ім'я:</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="phone">Телефон:</label>
                <input type="tel" id="phone" name="phone" required />

                <label htmlFor="apartment">Обрана квартира:</label>
                <input type="text" id="apartment" name="apartment" readOnly />

                <label htmlFor="message">Додаткова інформація:</label>
                <textarea id="message" name="message"></textarea>

                <button type="submit">Надіслати заявку</button>
            </form>
        </div>
    );
};

export default BookingForm;

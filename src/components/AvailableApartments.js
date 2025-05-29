import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import '../styles/styles.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ApartmentReviews from "./ApartmentsReviews";

const AvailableApartments = () => {
    const [sortType, setSortType] = useState("none");
    const [booked, setBooked] = useState([]);
    const { user } = useAuth();

    const apartments = [
        {
            img: "https://mastera-remonta.com/wp-content/uploads/2019/09/2-4.png",
            title: "2-кімнатна квартира", price: "$1000", size: "60", link: "2rooms"
        },
        {
            img: "https://studio-mint.pro/sites/default/files/sites/default/files/imce/21_1.jpg",
            title: "3-кімнатна квартира", price: "$1700", size: "85", link: "3rooms"
        },
        {
            img: "https://0ba.ru/images/2021/01/06/petroglif-park1-0.jpg",
            title: "1-кімнатна квартира", price: "$700", size: "40", link: "1room"
        }
    ];

    const getSortedApartments = () => {
        return [...apartments].sort((a, b) => {
            const priceA = parseInt(a.price.replace(/\D/g, ''));
            const priceB = parseInt(b.price.replace(/\D/g, ''));
            const sizeA = parseInt(a.size);
            const sizeB = parseInt(b.size);

            switch (sortType) {
                case "priceAsc":
                    return priceA - priceB;
                case "priceDesc":
                    return priceB - priceA;
                case "sizeAsc":
                    return sizeA - sizeB;
                case "sizeDesc":
                    return sizeB - sizeA;
                default:
                    return 0;
            }
        });
    };

    const sortedApartments = getSortedApartments();

    useEffect(() => {
        const fetchBooked = async () => {
            const snapshot = await getDocs(collection(db, 'bookings'));
            const bookedApartments = snapshot.docs
                .map(doc => doc.data())
                .map(b => b.apartmentId);
            setBooked(bookedApartments);
        };
        fetchBooked();
    }, []);

    useEffect(() => {
        const mapContainer = document.getElementById('map');
        if (mapContainer && !mapContainer._leaflet_id) {
            const map = L.map('map').setView([49.8397, 24.0297], 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(map);

            const customIcon = L.icon({
                iconUrl: '/icons/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            const markers = [
                { coords: [49.8327, 24.0132], popup: 'Квартира 1' },
                { coords: [49.789, 24.0187], popup: 'Квартира 2' },
                { coords: [49.8410, 24.0267], popup: 'Квартира 3' },
            ];

            markers.forEach(({ coords, popup }) => {
                L.marker(coords, { icon: customIcon }).addTo(map).bindPopup(popup);
            });
        }
    }, []);

    return (
        <div>
            <h1>Список доступних квартир</h1>

            {/* СОРТУВАННЯ ПО ЦЕНТРУ */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <label style={{ marginRight: '10px' }}>Сортування:</label>
                <select value={sortType} onChange={e => setSortType(e.target.value)}>
                    <option value="none">Без сортування</option>
                    <option value="priceAsc">Ціна ↑</option>
                    <option value="priceDesc">Ціна ↓</option>
                    <option value="sizeAsc">Площа ↑</option>
                    <option value="sizeDesc">Площа ↓</option>
                </select>
            </div>

            {/* КАРТКИ КВАРТИР */}
            <div className="apartment-grid">
                {sortedApartments.map((apt) => {
                    const isBooked = booked.includes(apt.link);
                    return (
                        <div className="apartment-card" key={apt.link} style={{ opacity: isBooked ? 0.6 : 1 }}>
                            <img src={apt.img} alt={apt.title} />
                            <h2>{apt.title}</h2>
                            <p>Ціна: {apt.price}</p>
                            <p>Площа: {apt.size} м²</p>
                            <div className="button-container">
                                {isBooked ? (
                                    <span style={{ color: "red" }}>Заброньовано</span>
                                ) : (
                                    <Link to={`/booking?apartment=${apt.link}`} className="a2">Забронювати</Link>
                                )}
                            </div>

                            {/* ВІДГУКИ */}
                            <ApartmentReviews apartmentId={apt.link} />
                        </div>
                    );
                })}
            </div>

            <div id="map" style={{ height: '400px', margin: '40px auto', maxWidth: '900px' }}></div>
        </div>
    );
};

export default AvailableApartments;

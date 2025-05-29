import React from 'react';
import '../styles/styles.css';

const Contacts = () => (
    <main className="info-container">
        <article className="info-box">
            <h1>Про компанію:</h1>
            <p><strong>Орендатор Львів 2.0</strong></p>
            <p>Компанія на ринку понад 10 років.</p>
            <p>Тисячі задоволених клієнтів.</p>
            <p>Широкий асортимент вибору квартир.</p>
        </article>
        <article className="info-box">
            <h1>Контактна інформація</h1>
            <p><strong>Адреса:</strong> м. Adress, вул. Adress №xx</p>
            <p><strong>Номери телефонів:</strong></p>
            <p>VODAFONE | +38 xxx xxx xxxx</p>
            <p>KYIVSTAR | +38 xxx xxx xxxx</p>
            <p>LIFECELL | +38 xxx xxx xxxx</p>
            <p><strong>Електронна пошта для зв'язку:</strong></p>
            <p>vladyslav.buhil@lpnu.ua</p>
            <p>vladyslav.buhil@gmail.com</p>
        </article>
    </main>
);

export default Contacts;

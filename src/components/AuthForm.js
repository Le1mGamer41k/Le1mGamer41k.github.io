// src/components/AuthForm.js
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { addUserToFirestore } from '../utils/addUserToFirestore';

const AuthForm = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (isRegister) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await addUserToFirestore(user.uid, {
                    email: user.email,
                    registeredAt: new Date().toISOString()
                });

                alert('Реєстрація успішна!');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                alert('Вхід успішний!');
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Такий email вже існує');
            } else {
                alert('Помилка: ' + error.message);
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2>{isRegister ? 'Реєстрація' : 'Вхід'}</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    {isRegister ? 'Зареєструватися' : 'Увійти'}
                </button>
            </form>
            <p onClick={() => setIsRegister(!isRegister)} style={styles.toggle}>
                {isRegister ? 'Вже є акаунт? Увійти' : 'Немає акаунта? Зареєструватись'}
            </p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        textAlign: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc'
    },
    button: {
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    toggle: {
        cursor: 'pointer',
        color: 'blue',
        marginTop: '10px'
    }
};

export default AuthForm;

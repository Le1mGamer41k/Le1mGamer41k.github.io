import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import AvailableApartments from './components/AvailableApartments';
import MyBookings from './components/MyBookings';
import BookingForm from './components/BookingForm';
import Contacts from './components/Contacts';
import './styles/styles.css';
import AuthForm from './components/AuthForm';
import {useAuth} from "./context/AuthContext";
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';


const App = () => {
    const { user } = useAuth();

    const handleLogout = () => {
        signOut(auth).catch((err) => {
            alert("Помилка при виході: " + err.message);
        });
    };

    return (
      <Router>
        <header>
          <nav>
            <ul>
              <li><Link to="/"> Головна</Link></li>
              <li><Link to="/available"> Доступні квартири</Link></li>
              <li><Link to="/bookings"> Мої бронювання</Link></li>
              <li><Link to="/contacts"> Контакти</Link></li>
            </ul>
            <div className={"auth"}>
              <ul>
                  {user ? (
                      <>
                          <li style={{ color: 'white' }}>👤 {user.email}</li>
                          <li>
                              <button
                                  onClick={handleLogout}
                                  style={{
                                      background: 'none',
                                      color: 'red',
                                      cursor: 'pointer',
                                      fontSize: '1em'
                                  }}
                              >
                                  Вийти
                              </button>
                          </li>
                      </>
                  ) : (
                      <li><Link to="/auth">Увійти / Зареєструватися</Link></li>
                  )}
              </ul>
            </div>



          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/available" element={<AvailableApartments />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/auth" element={<AuthForm />} />
        </Routes>

        <footer>
          <a href="#"> Контактна інформаціяs: buhilvy@gmail.com | +38 068 351 1546</a>
        </footer>
      </Router>
  );
};

export default App;

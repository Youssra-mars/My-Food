import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dishes from './components/Dishes';
import About from './components/About';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import Review from './components/Review';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => (
  <CartProvider>
    <Router>
      <Navbar />
      <CartDrawer />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <section id="home"><Home /></section>
              <section id="about"><About /></section>
              <section id="dishes"><Dishes /></section>
              <section id="reservation"><Reservation /></section>
              <section id="review"><Review /></section>
              <section id="contact"><Contact /></section>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  </CartProvider>
);

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '../src/Utils/cartContext';
import LandingPage from './components/landingpage';
import ProductSearch from './components/productsearch';
import CartPage from './components/cartPage';
import UserProfile from './components/userProfile';
import AboutManka from './components/aboutManka';
import Manual from './components/manual';
import StatusPage from './components/StatusPage';
const App = () => (
  <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/catalogo" element={<ProductSearch />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/about" element={<AboutManka />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/rastreo/:idproducto" element={<StatusPage />} />
      </Routes>
    </Router>
  </CartProvider>
);

export default App;
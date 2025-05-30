import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import '@fortawesome/fontawesome-free/css/all.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import ProductAll from './pages/ProuductAll/ProuductAll';

import Login from './pages/Login/Login';
import ProductDetails from './pages/ProductDetails/ProductDetails';



function App() {
  return (
    <Router>
  <div className="app-wrapper">
    <Navbar />
    <div className="content container mt-5">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductAll />} />
        <Route path="product/:id" element={<ProductDetails />} />

        <Route path="/login" element={<Login />} />

      </Routes>
    </div>
    <Footer />
  </div>
</Router>
  );
}

export default App;

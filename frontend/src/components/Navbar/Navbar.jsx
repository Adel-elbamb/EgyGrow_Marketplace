import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  // const [language, setLanguage] = useState("En");

  // const changeLanguage = (e) => {
  //   setLanguage(e.target.value);
  // };
const cartCount = useSelector((state) => state.cart.count);
  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${styles.navbar}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">EgyGrow</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#agrogateNavbar" 
          aria-controls="agrogateNavbar" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="agrogateNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} to="/products">All Products</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} to="/contact">Contact Us</Link>
            </li>
            {/* <li className="nav-item">
              <select className={styles.languageSelect} value={language} onChange={changeLanguage}>
                <option value="En">English</option>
                <option value="Ar">Arabic</option>
              </select>
            </li> */}
          </ul>
          <div className={styles.cart}>
        <FontAwesomeIcon icon={faShoppingCart} />
        {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
      </div>
          <div className="d-flex">
            <Link className={`btn btn-outline-primary me-2 ${styles.loginBtn}`} to="/login">Login</Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
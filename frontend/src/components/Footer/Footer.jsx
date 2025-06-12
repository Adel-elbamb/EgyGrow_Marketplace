import React from "react";
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/AlMasria-Logo-newflat-2.png'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <img src={logo} alt="Agrogate Logo" className={styles.logo} />
          <p className={styles.logoText}>
            Energit Misr for Agriculture and Agricultural Development, since 1998, committed to providing the best agricultural solutions.
          </p>

          <div className={styles.socialSection}>
            <div className={styles.socialIcons}>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-whatsapp"></i></a>
            </div>
            <p className={styles.socialText}>Follow us on social media</p>
          </div>
        </div>

        {/* Services Section */}
        <div className={styles.footerSection}>
          <h3>Services</h3>
          <ul>
            <li>Agricultural Supplies</li>
            <li>Veterinary Supplies</li>
            <li>Logistics Services</li>
            <li>Land Reclamation</li>
            <li>Market</li>
          </ul>
        </div>

        {/* Links Section */}
        <div className={styles.footerSection}>
          <h3>Links</h3>
          <ul>
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
          </ul>
        </div>

        {/* Contact Section */}
        <div className={styles.footerSection}>
          <h3>Contact Us</h3>
          <ul>
            <li>Phone: 01207111160</li>
            <li>Email: info@agrogate.com</li>
            <li>Address: Menoufia, Egypt</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerDivider}></div>

      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          © 2025 EgyGrow. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

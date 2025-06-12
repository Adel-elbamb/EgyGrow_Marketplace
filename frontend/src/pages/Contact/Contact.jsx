import React, { useState } from "react";
import styles from "./Contact.module.css";
import logo from "../../assets/images/AlMasria-Logo2-291x300.png";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("تم إرسال رسالتك بنجاح!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className={styles.contactContainer}>
      {/* map */}
      <div className={styles.mapContainer}>
        <iframe
          title="location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.638539336361!2d31.235711315114883!3d30.04441998188266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fcdf1ec8b23%3A0xeca5cbb9cb91ea31!2z2KfZhNmF2KzYp9mF2YrYqSDYp9mE2YXYs9mK2Kk!5e0!3m2!1sen!2seg!4v1623421234567"
          width="100%"
          height="350"
          allowFullScreen=""
          loading="lazy"
          style={{ border: 0 }}
        ></iframe>
      </div>

      <h1>تواصل معنا</h1>
      <p>نحن هنا لمساعدتك. لا تتردد في التواصل معنا في أي وقت.</p>

      {/*  form */}
      <div className={styles.contentWrapper}>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <label>الاسم</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>الرسالة</label>
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">إرسال</button>
        </form>

      {/*contact  */}
<div className={styles.contactContainer}>
  {/* logo */}
  <div className={styles.logoContainer}>
    <img src={logo} alt="EgyGrow Logo" className={styles.logo} />
  </div>
  
  <div className={styles.contactInfo}>
    <h3 className={styles.contactTitle}>معلومات الاتصال</h3>
    
    <div className={styles.contactItem}>
             <i className="fas fa-phone" style={{ marginLeft: '10px', color: '#4caf50' }}></i>
            <span>0123456789</span>
    </div>
    
    <div className={styles.contactItem}>
       <i className="fas fa-envelope" style={{ marginLeft: '10px', color: '#4caf50' }}></i>
      <span>info@egygrow.com</span>
    </div>
    
    <div className={styles.contactItem}>
      <i className="fas fa-map-marker-alt" style={{ marginLeft: '10px', color: '#4caf50' }}></i>
      <span>القاهرة، مصر</span>
    </div>
    
    <div className={styles.socialIcons}>
       <a href="#"><i className="fab fa-facebook"></i></a>
    <a href="#"><i className="fab fa-whatsapp"></i></a>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Contact;

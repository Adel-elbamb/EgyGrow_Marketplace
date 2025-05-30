import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from 'react-router-dom';
import productImage from "../../assets/images/asian-farmer-working-field-spraying-chemical_30478-5123-626x400.jpg";

const slides = [
  {
    image: require("../../assets/images/pic-1.jpg"),
    title: "وكلاء لأكبر الشركات العالمية والمحلية",
    description: "نقدم منتجات زراعية عالية الجودة.",
  },
  {
    image: require("../../assets/images/pic-3.jpg"),
    title: "خبرة منذ عام 1998",
    description: "نسعى لخدمة الفلاح المصري بكل احترافية.",
  },
  {
    image: require("../../assets/images/vecteezy_green-trees-growing-on-coins-increases-concept-of-business-growth_2140590-scaled-1040x640.jpg"),
    title: "فروع تغطي أنحاء الجمهورية",
    description: "أينما كنت، خدماتنا قريبة منك.",
  },
  {
    image: require("../../assets/images/vecteezy_plant-growing-with-hand-and-sunshine-in-garden_1410276-scaled.jpg"),
    title: "نوفر منتجات عالية الجودة بأسعار تنافسية",
    description: "أينما كنت، خدماتنا قريبة منك.",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  //slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];
  // up

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.homeContainer}>
      <div
        className={styles.heroSection}
        style={{ backgroundImage: `url(${currentSlide.image})` }}
      >
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1>{currentSlide.title}</h1>
          <p>{currentSlide.description}</p>
          <div className={styles.ctaButtons}>
            <Link to="/products" className={styles.ctaButton}>
              منتجاتنا
            </Link>
            <Link to="/contact" className={styles.ctaButton}>
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>

      {/* About*/}
      <section className={styles.aboutSection}>
        <h2>تعرف علينا أكثر</h2>
        <img
          src={require("../../assets/images/AlMasria-Logo-v1.png")}
          alt="من نحن"
          className={styles.aboutImage}
        />
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <p>
              تعمل شركة الأسمدة والمحاصيل الزراعية المصرية في تقديم خدمات متميزة في القطاع الزراعي منذ عام 1998.
            </p>
          </div>
        </div>
      </section>
{/* product  */}
      <section className={styles.ProductSection}>
        <h2>منتجات عالية الجودة بأسعار تنافسية</h2>
        <div className={styles.ProductContent}>
          <img
            src={productImage}
            alt="منتج"
            className={styles.ProductImage}
          />
          <div className={styles.ProductTextContainer}>
            <div className={styles.ProductText}>
              <p>
                نوفر أفضل{" "}
                <span className={styles.ProductTextb}>الأسمدة والمواد الزراعية</span>{" "}
                التي تجعل النبات نشيطًا وقويًا، وتساعده على النمو السريع والصحيح، كما تجعله قويًا في مقاومة الأمراض، مما يجعل التربة أكثر خصوبة ويساعد في الحصول على محاصيل عالية الجودة.
              </p>
            </div>
            <div className={styles.ctaButtons}>
              <Link to="/products" className={styles.ctaButton}>
                منتجاتنا
              </Link>
              <Link to="/contact" className={styles.ctaButton}>
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>

     
      {showScrollTop && (
        <button className={styles.scrollTopButton} onClick={scrollToTop}>
          <i className="fas fa-chevron-up"></i>
        </button>
      )}
    </div>
  );
};

export default Home;

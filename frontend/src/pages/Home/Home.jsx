import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from 'react-router-dom';
import productImage from "../../assets/images/asian-farmer-working-field-spraying-chemical_30478-5123-626x400.jpg";


const slides = [
  {
    image: require("../../assets/images/pic-1.jpg"),
    title: "Agents for Leading Global and Local Companies",
    description: "We offer premium quality agricultural products.",
  },
  {
    image: require("../../assets/images/pic-3.jpg"),
    title: "Experience Since 1998",
    description: "We strive to serve Egyptian farmers professionally.",
  },
  {
    image: require("../../assets/images/vecteezy_green-trees-growing-on-coins-increases-concept-of-business-growth_2140590-scaled-1040x640.jpg"),
    title: "Branches Covering the Entire Country",
    description: "Wherever you are, our services are close to you.",
  },
  {
    image: require("../../assets/images/vecteezy_plant-growing-with-hand-and-sunshine-in-garden_1410276-scaled.jpg"),
    title: "Providing High-Quality Products at Competitive Prices",
    description: "Wherever you are, our services are close to you.",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // slider 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  // Scroll to Top logic
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
    Our Products
  </Link>
  <Link to="/contact" className={styles.ctaButton}>
    Contact Us
  </Link>
</div>
        </div>
      </div>

      {/* About Section */}
      <section className={styles.aboutSection}>
        <h2>Learn More About Us</h2>
         <img
        src={require("../../assets/images/AlMasria-Logo-v1.png")}
        alt="About Us"
        className={styles.aboutImage}
      />
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <p>
              Egypt Fertilizers and Agricultural Crops has been providing outstanding services in the agriculture sector since 1998.
            </p>
          </div>
        </div>
      </section>



     {/* Product Section */}
      <section className={styles.ProductSection}>
        <h2>High quality products at competitive prices</h2>
        <div className={styles.ProductContent}>
          <img
            src={productImage}
            alt="Product"
            className={styles.ProductImage}
          />
          <div className={styles.ProductTextContainer}>
            <div className={styles.ProductText}>
              <p>
                We provide the best{" "}
                <span className={styles.ProductTextb}>fertilizers and agricultural</span>{" "}
                nutrients that make the plant active and vigorous, helping it to
                grow quickly and correctly, while also making it strong and
                resistant to diseases, thus making the soil more fertile and
                aiding in obtaining high-quality crops.
              </p>
            </div>
            <div className={styles.ctaButtons}>
              <Link to="/products" className={styles.ctaButton}>
                Our Products
              </Link>
              <Link to="/contact" className={styles.ctaButton}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>



    {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className={styles.scrollTopButton} onClick={scrollToTop}>
          <i className="fas fa-chevron-up"></i>
        </button>
      )}
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";
import styles from "./ProductDetails.module.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/product/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    alert(`${product.name} تمت إضافته إلى السلة`);
  };

  if (loading) return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
    </div>
  );

  if (error) return (
    <div className={styles.container}>
      <div className={styles.errorContainer}>
        <p>خطأ: {error}</p>
      </div>
      <button 
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        <FiArrowLeft /> العودة للخلف
      </button>
    </div>
  );

  if (!product) return null;

  return (
    <div className={styles.container}>
      <button 
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        <FiArrowLeft /> العودة للمتجر
      </button>
      
      <div className={styles.productCard}>
        <div className={styles.imageSection}>
          {product.images && product.images.length > 0 && (
            <img
              src={`http://localhost:5000/uploads/products/${product.images[0]}`}
              alt={product.name}
              className={styles.productImage}
            />
          )}
        </div>
        
        <div className={styles.infoSection}>
          <span className={styles.category}>{product.category?.name}</span>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
          
          <div className={styles.priceSection}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className={styles.price}>{product.price} جنيه</span>
              <span className={`${styles.availability} ${product.quantity > 0 ? styles.inStock : styles.outOfStock}`}>
                {product.quantity > 0 ? 'متوفر' : 'غير متوفر'}
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={product.quantity <= 0}
              className={`${styles.addToCartBtn} ${product.quantity > 0 ? styles.primaryBtn : styles.disabledBtn}`}
            >
              <FiShoppingCart style={{ marginRight: '0.5rem' }} />
              {product.quantity > 0 ? 'أضف إلى السلة' : 'غير متوفر'}
            </button>
          </div>
          
          <div className={styles.additionalInfo}>
            <h3 className={styles.additionalTitle}>معلومات إضافية</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <p className={styles.infoLabel}>الكمية المتاحة</p>
                <p className={styles.infoValue}>{product.quantity}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.infoLabel}>رقم المنتج</p>
                <p className={styles.infoValue}>{product._id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faEye, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import styles from "./ProuductAll.module.css";
import { useNavigate } from 'react-router-dom';

const ProductAll = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPage] = useState(8);
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [search, setsearch] = useState("");

   useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:5000/product"),
          fetch("http://localhost:5000/category"),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("فشل في جلب البيانات");
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData.products || []);
        setCategories(categoriesData.categories || []);
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError("فشل في الاتصال بالخادم. تأكد من الشبكة.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

// filter
  const filteredProducts = products.filter((product) => {
  const matchesCategory = category === "all" || product.category?.name === category;
  const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
  return matchesCategory && matchesSearch;
});
   // pagination 
  const indexOfLastProduct = currentPage * productsPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) return <p className={styles.loading}>جاري التحميل...</p>;
  if (error) return <p className={styles.error}>خطأ: {error}</p>;


  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>منتجاتنا</h2>
      <div className={styles.filters}>
  <input
    type="text"
    placeholder="ابحث باسم المنتج..."
    value={search}
    onChange={(e) => {setsearch(e.target.value);
      setCurrentPage(1);
    }}
    className={styles.searchInput}
  />

  <select
    value={category}
    onChange={(e) => {setCategory(e.target.value);
      setCurrentPage(1);
    }}
    className={styles.categorySelect}
  >
    {/* <option value="all">كل الفئات</option>
    <option value= "مبيدات فطرية"> مبيدات فطرية</option>
    <option value="مبيدات حشريه">مبيدات حشريه</option> */}
    <option value="all">كل الفئات</option>
     {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
  </select>
</div>

      
      {products.length === 0 ? (
        <p className={styles.emptyMessage}>لا توجد منتجات متاحة حالياً</p>
      ) : (
        <>
          <ul className={styles.productGrid}>
            {currentProducts.map((product) => (
              <li key={product._id} className={styles.productCard}>
                <div className={styles.imageContainer}>
                  {product.images?.length > 0 && (
                    <img
                      src={`http://localhost:5000/uploads/products/${product.images[0]}`}
                      alt={product.name}
                      className={styles.productImage}
                    />
                  )}
                </div>
                
                <div className={styles.productContent}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>{product.price} جنيه</p>
                  
                  <div className={styles.actions}>
                    <button
                      className={`${styles.actionButton} ${styles.cartButton}`}
                      title="أضف إلى السلة"
                    >
                      <FontAwesomeIcon icon={faCartPlus} />
                    </button>
                    
                    <button
                      className={`${styles.actionButton} ${styles.viewButton}`}
                      onClick={() => navigate(`/product/${product._id}`)}
                      title="عرض التفاصيل"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button 
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
            
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`${styles.pageButton} ${currentPage === number ? styles.active : ''}`}
              >
                {number}
              </button>
            ))}
            
            <button 
              onClick={() => paginate(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)}
              disabled={currentPage === pageNumbers.length}
              className={styles.pageButton}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductAll;

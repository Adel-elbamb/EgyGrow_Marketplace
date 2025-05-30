import React, { useState, useEffect } from "react";
import styles from "./ProuductAll.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity } from "../../store/slices/cart";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products from:", "http://localhost:5000/product");
        const response = await fetch("http://localhost:5000/product", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Response status:", response?.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data received:", data);
        setProducts(data.products || []);
      } catch (err) {
        console.error("Fetch error:", err.message);
        if (err.message.includes("Failed to fetch")) {
          setError(
            "Failed to connect to the server. Please check if the backend is running."
          );
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.productContainer}>
      <h2>Our Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul className={styles.productList}>
          {products.map((product) => (
            <li key={product._id} className={styles.productItem}>
              <h3>{product.name}</h3>
              <p>{product.description || "No description"}</p>
              <p>Price: ${product.price || "N/A"}</p>
              <p>Stock: {product.stock || "N/A"}</p>
              {product.category && (
                <p>Category: {product.category.name || "N/A"}</p>
              )}
              {product.images && product.images.length > 0 && (
                <img
                  src={`http://localhost:5000/uploads/${product.images[0]}`}
                  alt={product.name}
                  className={styles.productImage}
                />
              )}
              <button
                onClick={() =>
                  cart.find((item) => item.element._id === product._id)
                    ? dispatch(increaseQuantity(product))
                    : dispatch(addToCart(product))
                }
              >
                click
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Product;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../services/productService";
import { getAllCategories } from "../../../services/categoryService";
import config from "../../../config";
import styles from "./Products.module.css";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", quantity: "",
    category: "",stock: "",image: null,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.categories || []);
    } catch {
      toast.error("فشل في تحميل الفئات");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response?.products || []);
    } catch {
      toast.error("فشل في تحميل المنتجات");
    }
  };

  const handleOpen = (product = null) => {
    if (product) {
      setEditProduct(product);
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        quantity: product.quantity || "",
        category: product.category?._id || "",
        stock: product.stock || "",
        image: null,
      });
    } else {
      setEditProduct(null);
      setFormData({
        name: "", description: "", price: "", quantity: "",
        category: "",stock: "",image: null,
      });
    }
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: name === "image" ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      stock: Number(formData.stock),
      category: formData.category,
      image: formData.image,
    };

    try {
      if (editProduct) {
        await updateProduct(editProduct._id, productData);
        toast.success("تم تحديث المنتج بنجاح!");
      } else {
        await createProduct(productData);
        toast.success("تم إنشاء المنتج بنجاح!");
      }
      fetchProducts();
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل في حفظ المنتج");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      try {
        await deleteProduct(id);
        toast.success("تم حذف المنتج بنجاح!");
        fetchProducts();
      } catch {
        toast.error("فشل في حذف المنتج");
      }
    }
  };

  return (
    <div className={styles["products-container"]}>
      <Toaster />
      <Helmet>
        <title>المنتجات | EgyGrow</title>
        <meta name="description" content="إدارة منتجات EgyGrow" />
      </Helmet>

      <div className={styles["products-header"]}>
        <h1>المنتجات</h1>
        <div className={styles["header-buttons"]}>
          <button
            className={styles["dashboard-button"]}
            onClick={() => navigate("/admin/dashboard")}
          >
            لوحة التحكم
          </button>
          <button className={styles["add-button"]} onClick={() => handleOpen()}>
            إضافة منتج
          </button>
        </div>
      </div>

      <div className={styles["products-table-container"]}>
        {products.length === 0 ? (
          <div className={styles["no-products"]}>لا توجد منتجات</div>
        ) : (
          <table className={styles["products-table"]}>
            <thead>
              <tr>
                <th>اسم المنتج</th>
                <th>الوصف</th>
                <th>السعر</th>
                <th>الكمية</th>
                <th>الفئة</th>
                <th>المخزون</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price} جنيه</td>
                  <td>{product.quantity}</td>
                  <td>{product.category?.name || "غير محدد"}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button
                      className={styles["edit-button"]}
                      onClick={() => handleOpen(product)}
                    >
                      تعديل
                    </button>
                    <button
                      className={styles["delete-button"]}
                      onClick={() => handleDelete(product._id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className={styles.modal}>
          <div className={styles["modal-content"]}>
            <div className={styles["modal-header"]}>
              <h2>{editProduct ? "تعديل المنتج" : "إضافة منتج جديد"}</h2>
              <button className={styles["close-button"]} onClick={handleClose}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles["form-group"]}>
                <label>اسم المنتج:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles["form-group"]}>
                <label>الوصف:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                />
              </div>
              <div className={styles["form-row"]}>
                <div className={styles["form-group"]}>
                  <label>السعر:</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles["form-group"]}>
                  <label>الكمية:</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className={styles["form-group"]}>
                <label>الفئة:</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">اختر الفئة</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles["form-group"]}>
                <label>المخزون:</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles["form-group"]}>
                <label>الصورة:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  accept="image/*"
                />
              </div>
              <div className={styles["form-buttons"]}>
                <button
                  type="button"
                  className={styles["cancel-button"]}
                  onClick={handleClose}
                >
                  إلغاء
                </button>
                <button type="submit" className={styles["submit-button"]}>
                  {editProduct ? "تحديث" : "إنشاء"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

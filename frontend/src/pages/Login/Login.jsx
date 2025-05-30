import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import styles from "./Login.module.css";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${config.apiUrl}/auth/login`,
        formData
      );

      if (!response.data || !response.data.token) {
        throw new Error("بيانات الاستجابة غير صحيحة");
      }

      const { token } = response.data;
      localStorage.setItem("user_token", token);
      axios.defaults.headers.common["Authorization"] = token;
      if (response.data.user) {
        localStorage.setItem("user_data", JSON.stringify(response.data.user));
      }
      toast.success("تم تسجيل الدخول بنجاح!");
      navigate("/admin/products");

    } catch (err) {
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_data");
      delete axios.defaults.headers.common["Authorization"];
      const errorMessage = err.response?.data?.message || "فشل تسجيل الدخول. يرجى التحقق من البيانات.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["login-container"]}>
      <Helmet>
        <title>تسجيل الدخول | EgyGrow</title>
        <meta name="description" content="تسجيل الدخول إلى حسابك في EgyGrow" />
      </Helmet>
      
      <Toaster />

      <div className={styles["login-card"]}>
        <button onClick={() => navigate("/")} className={styles["login-close"]}>
          <IoClose />
        </button>

        <h1 className={styles["login-title"]}>تسجيل الدخول</h1>
        <p className={styles["login-subtitle"]}>أدخل بيانات حسابك للوصول إلى لوحة التحكم</p>

        {error && <div className={styles["error-message"]}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles["login-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="أدخل البريد الإلكتروني"
              disabled={loading}
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="password">كلمة المرور</label>
            <div className={styles["password-input-container"]}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="أدخل كلمة المرور"
                disabled={loading}
              />
              <button
                type="button"
                className={styles["password-toggle"]}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`${styles["login-button"]} ${loading ? styles["loading"] : ""}`}
            disabled={loading}
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

 
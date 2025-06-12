import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import axios from "axios";
import config from "../../../config";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [subadmins, setSubadmins] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedSubadmin, setSelectedSubadmin] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",lastName: "",email: "",password: "",
    mobileNumber: "",userName: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.defaults.headers.common["Authorization"] = token;
    fetchSubadmins();
  }, [navigate]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("user_token");
    if (!token) return {};
    return { Authorization: token };
  };

  const fetchSubadmins = async () => {
    try {
      const headers = getAuthHeaders();
      if (!headers.Authorization) return;

      const url = `${config.apiUrl}/auth/subadmins`;
      const response = await axios.get(url, { headers });

      if (response.status === 200) {
        setSubadmins(response.data.subAdmins || []);
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      handleAuthError(error, "فشل في تحميل المشرفين");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue =
      name === "userName"
        ? value.replace(/[^a-zA-Z0-9\u0600-\u06FF\s]/g, "")
        : value;
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const headers = getAuthHeaders();
    if (!headers.Authorization) return;

    if (!formData.firstName || !formData.lastName || !formData.userName) {
      toast.error("الاسم الأول والاسم الأخير واسم المستخدم مطلوبة");
      return;
    }

    try {
      const requestData = {
        ...formData,
        mobileNumber: formData.mobileNumber || undefined,
        role: "subAdmin",
      };

      await axios.post(`${config.apiUrl}/auth/createSubadmin`, requestData, {
        headers,
      });
      toast.success("تم إضافة المشرف بنجاح");
      resetForm();
      fetchSubadmins();
    } catch (error) {
      if (
        error.response?.data?.message?.includes("userNmae must be unique") ||
        error.response?.data?.message?.includes("duplicate key") ||
        error.response?.data?.code === 11000
      ) {
        toast.error("هذا الاسم مستخدم من قبل. من فضلك اختر اسم آخر");
      } else {
        handleAuthError(error, "فشل في إنشاء المشرف");
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSubadmin?._id) return toast.error("لم يتم تحديد مشرف للتعديل");

    const headers = getAuthHeaders();
    if (!headers.Authorization) return;

    if (!formData.firstName || !formData.lastName) {
      toast.error("الاسم الأول والاسم الأخير مطلوبة");
      return;
    }

    const updateData = {
      ...formData,
      mobileNumber: formData.mobileNumber || undefined,
      role: "subAdmin",
    };
    if (!formData.password) delete updateData.password;

    try {
      await axios.put(
        `${config.apiUrl}/auth/subadmin/${selectedSubadmin._id}`,
        updateData,
        { headers }
      );
      toast.success("تم تعديل بيانات المشرف");
      resetForm();
      fetchSubadmins();
    } catch (error) {
      handleAuthError(error, "فشل في تحديث بيانات المشرف");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المشرف؟")) return;

    try {
      const headers = getAuthHeaders();
      if (!headers.Authorization) return;

      await axios.delete(`${config.apiUrl}/auth/subadmin/${id}`, { headers });
      toast.success("تم حذف المشرف");
      fetchSubadmins();
    } catch (error) {
      handleAuthError(error, "فشل في حذف المشرف");
    }
  };

  const startUpdate = (subadmin) => {
    setSelectedSubadmin(subadmin);
    setFormData({
      firstName: subadmin.firstName || "",
      lastName: subadmin.lastName || "",
      email: subadmin.email || "",
      mobileNumber: subadmin.mobileNumber || "",
      password: "",
    });
    setShowUpdateForm(true);
    setShowCreateForm(false);
  };

  const resetForm = () => {
    setFormData({
      firstName: "", lastName: "", email: "",
      password: "", mobileNumber: "", userName: "",
    });
    setShowCreateForm(false);
    setShowUpdateForm(false);
    setSelectedSubadmin(null);
  };

  const handleAuthError = (error, fallbackMessage) => {
    if (
      error.response?.status === 401 ||
      error.response?.data?.message === "Invalid token"
    ) {
      toast.error("انتهت صلاحية الجلسة. يرجى تسجيل الدخول مجدداً");
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_data");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      toast.error(error.response?.data?.message || fallbackMessage);
    }
  };

  return (
    <div className={styles["admin-dashboard"]}>
      <Helmet>
        <title>لوحة التحكم | EgyGrow</title>
        <meta name="description" content="لوحة تحكم EgyGrow" />
      </Helmet>

      <Toaster />

      <div className={styles["dashboard-header"]}>
        <h1>لوحة التحكم</h1>
      </div>

      <div className={styles["subadmin-section"]}>
        <div className={styles["dashboard-actions"]}>
          <button
            className={styles["create-button"]}
            onClick={() => {
              resetForm();
              setShowCreateForm(true);
            }}
          >
            <FaPlus />
            إضافة مشرف جديد
          </button>
        </div>

        {showCreateForm && (
          <FormComponent
            title="إضافة مشرف جديد"
            formData={formData}
            handleChange={handleInputChange}
            handleSubmit={handleCreateSubmit}
            handleCancel={() => setShowCreateForm(false)}
            isCreate
          />
        )}

        {showUpdateForm && (
          <FormComponent
            title="تعديل بيانات المشرف"
            formData={formData}
            handleChange={handleInputChange}
            handleSubmit={handleUpdateSubmit}
            handleCancel={() => setShowUpdateForm(false)}
            isCreate={false}
          />
        )}

        <div className={styles["subadmins-list"]}>
          <h2>قائمة المشرفين</h2>
          <div className={styles["table-container"]}>
            <table className={styles["subadmins-table"]}>
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>البريد الإلكتروني</th>
                  <th>رقم الهاتف</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {subadmins.map((subadmin) => (
                  <tr key={subadmin._id}>
                    <td>{`${subadmin.firstName || ""} ${
                      subadmin.lastName || ""
                    }`}</td>
                    <td>{subadmin.email}</td>
                    <td>{subadmin.mobileNumber || "غير متوفر"}</td>
                    <td>
                      <button
                        className={styles["edit-button"]}
                        onClick={() => startUpdate(subadmin)}
                      >
                        تعديل
                      </button>
                      <button
                        className={styles["delete-button"]}
                        onClick={() => handleDelete(subadmin._id)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormComponent = ({
  title,
  formData,
  handleChange,
  handleSubmit,
  handleCancel,
  isCreate,
}) => (
  <div className={styles["form-container"]}>
    <h2>{title}</h2>
    <form onSubmit={handleSubmit}>
      {isCreate && (
        <div className={styles["form-group"]}>
          <label>اسم المستخدم:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            minLength="3"
            maxLength="30"
            placeholder="أدخل اسم المستخدم"
          />
        </div>
      )}
      <div className={styles["form-group"]}>
        <label>الاسم الأول:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          placeholder="أدخل الاسم الأول"
        />
      </div>
      <div className={styles["form-group"]}>
        <label>الاسم الأخير:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          placeholder="أدخل الاسم الأخير"
        />
      </div>
      <div className={styles["form-group"]}>
        <label>البريد الإلكتروني:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="أدخل البريد الإلكتروني"
        />
      </div>
      <div className={styles["form-group"]}>
        <label>كلمة المرور:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={
            isCreate ? "أدخل كلمة المرور" : "اتركه فارغاً للاحتفاظ بكلمة المرور الحالية"
          }
          {...(isCreate ? { required: true } : {})}
        />
      </div>
      <div className={styles["form-group"]}>
        <label>رقم الهاتف:</label>
        <input
          type="tel"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          placeholder="أدخل رقم الهاتف"
        />
      </div>
      <div className={styles["form-buttons"]}>
        <button type="submit">{isCreate ? "إضافة" : "تحديث"}</button>
        <button type="button" onClick={handleCancel}>
          إلغاء
        </button>
      </div>
    </form>
  </div>
);

export default AdminDashboard;

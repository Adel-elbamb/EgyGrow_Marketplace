import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("user_token"); 
      const res = await axios.get(`${config.apiUrl}/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response from API:", res.data);
      setOrders(res.data.data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("user_token");
      await axios.patch(`${config.apiUrl}/order/update-status/${orderId}`,
        { orderStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-5">جاري التحميل...</p>;

  return (
    <div className="container mt-5" dir="rtl">
      <h2 className="mb-4 text-center">كل الطلبات</h2>
      <table className="table table-bordered table-striped text-end">
        <thead className="table-dark">
          <tr>
            <th>الاسم</th>
            <th>العنوان</th>
            <th>الموبايل</th>
            <th>المبلغ</th>
            <th>الحالة</th>
            <th>تعديل الحالة</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.customerInfo.fullname}</td>
              <td>{order.customerInfo.address}</td>
              <td>{order.customerInfo.mobileNumber}</td>
              <td>{order.totalAmount} جنيه</td>
              <td>{order.orderStatus}</td>
              <td>
                <select
                  className="form-select"
                  value={order.orderStatus}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Pending">قيد الانتظار</option>
                  <option value="Shipped">تم الشحن</option>
                  <option value="Delivered">تم التسليم</option>
                  <option value="Cancelled">ملغي</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrder;

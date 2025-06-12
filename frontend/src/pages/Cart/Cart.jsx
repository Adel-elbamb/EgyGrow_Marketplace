import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
} from "../../store/slices/cart";
import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const cart = useSelector((state) => state.cart.products);
  const [selectedPayMethod, setSelectedPayMethod] = useState("");
  const [couponValue, setCouponValue] = useState("");
  const [coupon, setCoupon] = useState("");
  const [orderTotalPrice, setOrderTotalPrice] = useState(0);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(selectedPayMethod);
  // }, [selectedPayMethod]);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    setOrderTotalPrice(total);
    if (coupon && coupon.discountPercentage) {
      const discounted = total - total * (coupon.discountPercentage / 100);
      setOrderTotalPrice(discounted);
      console.log(orderTotalPrice);
    } else {
      setOrderTotalPrice(total);
      console.log(orderTotalPrice);
    }
  }, [cart, coupon]);

  // useEffect(() => {
  //   if (coupon) {
  //     console.log(coupon.discountPercentage);
  //     console.log(orderTotalPrice);
  //     setOrderTotalPrice(orderTotalPrice * (coupon.discountPercentage / 100));
  //   }
  // }, [orderTotalPrice]);

  const checkStock = (reducer, product) => {
    if (product.stock > 1) {
      dispatch(reducer(product));
    }
  };

  const handleCheck = async () => {
    // console.log(coupon);
    if (couponValue && !coupon) {
      const response = await axios.get("http://localhost:5000/coupon/check", {
        params: { couponCode: couponValue },
        validateStatus: () => true,
      });
      // console.log(response.data.data);
      if (response.status === 200 && response.data) {
        setCoupon(response.data.data);
      } else {
        console.log("not good");
      }
    }
  };

  return (
    <div className="row">
      <div className="col-4">
        <div className="accordion" id="accordionExample">
          <form action="">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  طريقة الدفع
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <label className="d-flex">
                    عند الاستلام
                    <input
                      type="radio"
                      value="onDelivery"
                      checked={selectedPayMethod === "onDelivery"}
                      onChange={(e) => setSelectedPayMethod(e.target.value)}
                    />
                  </label>
                  <label className="d-flex">
                    من المقر الرئيسي
                    <input
                      type="radio"
                      value="fromHeadquarters"
                      checked={selectedPayMethod === "fromHeadquarters"}
                      onChange={(e) => setSelectedPayMethod(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  عنوان الشحن
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <a
                    href="https://maps.app.goo.gl/nNvH1XkkbnGu3SoC7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    افتح الموقع على الخريطة
                  </a>
                  <label htmlFor="fullname">الاسم كامل</label>
                  <br />
                  <input
                    type="text"
                    id="fullname"
                    placeholder="ادخل الاسم كامل"
                  />

                  <label htmlFor="phoneNumber">رقم الموبايل</label>
                  <br />
                  <input
                    type="number"
                    id="phoneNumber"
                    placeholder="ادخل رقم الموبايل "
                  />

                  <label htmlFor="address">العنوان</label>
                  <br />
                  <input type="text" id="address" placeholder="ادخل العنوان" />

                  <label htmlFor="government">المحافظة</label>
                  <br />
                  <select id="government">
                    <option value="">اختر المحافظة</option>
                    <option value="القاهرة">القاهرة</option>
                    <option value="الجيزة">الجيزة</option>
                    <option value="الإسكندرية">الإسكندرية</option>
                    <option value="الدقهلية">الدقهلية</option>
                    <option value="البحر الأحمر">البحر الأحمر</option>
                    <option value="البحيرة">البحيرة</option>
                    <option value="الفيوم">الفيوم</option>
                    <option value="الغربية">الغربية</option>
                    <option value="الإسماعيلية">الإسماعيلية</option>
                    <option value="المنوفية">المنوفية</option>
                    <option value="المنيا">المنيا</option>
                    <option value="القليوبية">القليوبية</option>
                    <option value="الوادي الجديد">الوادي الجديد</option>
                    <option value="السويس">السويس</option>
                    <option value="اسوان">أسوان</option>
                    <option value="اسيوط">أسيوط</option>
                    <option value="بني سويف">بني سويف</option>
                    <option value="بورسعيد">بورسعيد</option>
                    <option value="دمياط">دمياط</option>
                    <option value="الشرقية">الشرقية</option>
                    <option value="جنوب سيناء">جنوب سيناء</option>
                    <option value="كفر الشيخ">كفر الشيخ</option>
                    <option value="مطروح">مطروح</option>
                    <option value="الأقصر">الأقصر</option>
                    <option value="قنا">قنا</option>
                    <option value="شمال سيناء">شمال سيناء</option>
                    <option value="سوهاج">سوهاج</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  هل لديك كود خصم
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <input
                    type="text"
                    placeholder="ادخل قيمة الكوبون"
                    value={couponValue}
                    onChange={(e) => setCouponValue(e.target.value)}
                  />
                  <a onClick={handleCheck}>تفعيل</a>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  المجموع الكلي
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">ssssssssssssssss</div>
              </div>
            </div>
            <button className="btn btn-success my-3 px-5 m-auto d-block">
              Next
            </button>
          </form>
        </div>
      </div>
      <div className="col-8 text-center">
        <table className="table">
          <thead className="table-success">
            <tr>
              <th colSpan={2}>السعر الكلي</th>
              <th colSpan={3}>الكمية</th>
              <th>السعر</th>
              <th>المنتجات</th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {cart.map((product) => (
              <tr key={product.element._id}>
                <td onClick={() => dispatch(removeProduct(product))}>{"x"}</td>
                <td>ج.م {product.totalPrice}</td>
                <td onClick={() => dispatch(decreaseQuantity(product.element))}>
                  {"-"}
                </td>
                <td>{product.quantity}</td>
                <td
                  onClick={() => checkStock(increaseQuantity, product.element)}
                >
                  {"+"}
                </td>
                <td>{product.element.price} ج.م</td>
                <td>{product.element.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;

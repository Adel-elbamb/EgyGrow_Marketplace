import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
} from "../../store/slices/cart";

const Cart = () => {
  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const checkStock = (reducer, product) => {
    if (product.stock > 1) {
      dispatch(reducer(product));
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
                <div className="accordion-body">aaaaaaaaaaaaaaa</div>
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
                <div className="accordion-body">ssssssssssssssss</div>
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
                <div className="accordion-body">sssssssssssssssssss</div>
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

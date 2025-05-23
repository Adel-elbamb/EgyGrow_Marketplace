import connection from "../DB/connection.js";
import AuthRouter from "./module/auth/auth.router.js";
import { globalError } from "./utils/asyncHandler.js";
import productRouter from "./module/product/product.router.js";
import orderRouter from "./module/order/order.router.js";
import couponRouter from "./module/coupon/coupon.router.js";

const initializeApp = (app, express) => {
  app.use(express.json());
  connection();
  app.use("/product", productRouter);
  app.use("/order", orderRouter);
  app.use("/coupon", couponRouter);
  app.use("/auth", AuthRouter);
  app.use("/{*any}", (req, res, next) => {
    res.status(404).json({
      success: false,
      message: `Can't find this route: ${req.originalUrl}`,
    });
  });

  app.use(globalError);
};

export default initializeApp;

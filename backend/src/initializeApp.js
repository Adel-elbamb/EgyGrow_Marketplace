import connection from "../DB/connection.js";
import AuthRouter from "./module/auth/auth.router.js";
import { globalError } from "./utils/asyncHandler.js";
import cors from "cors";

const initializeApp = (app, express) => {
  app.use(express.json());
  // app.use(cors());
  connection();
  app.use("/product", productRouter);
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

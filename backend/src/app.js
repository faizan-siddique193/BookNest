import express from "express";
morgan;
import cors from "cors";
import userRouter from "./routes/user.route.js";
import bookRouter from "./routes/book.route.js";
import cartRouter from "./routes/cart.route.js";
import logger from "./utils/logger.js";
import morgan from "morgan";
import whishListRouter from "./routes/wishlist.route.js";
import orderRouter from "./routes/order.route.js";
import reviewRouter from "./routes/review.route.js";
const app = express();
app.use(
  cors({
    origin: process.env.CROSS_ORIGIN,
    credentials: true,
  })
);

// get logs of api
const morganFormat = ":method :url :status :response-time ms";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// initilize middler for router of controller
app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/wishlist", whishListRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/review", reviewRouter);

// http://localhost:5000/api/v1/books
export default app;

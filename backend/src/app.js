import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import bookRouter from "./routes/book.route.js";
import cartRouter from "./routes/cart.route.js";
import logger from "./utils/logger.js";
import morgan from "morgan";
import whishListRouter from "./routes/wishlist.route.js";
import orderRouter from "./routes/order.route.js";
import reviewRouter from "./routes/review.route.js";
import paymentRouter from "./routes/payment.route.js";
import { webhookEndpoints } from "./controllers/payment.controller.js";

const app = express();

app.use(
  cors({
    origin: process.env.CROSS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

// IMPORTANT: Webhook route BEFORE body parsers (needs raw body)
app.post(
  "/api/v1/payment/stripe/webhook",
  express.raw({ type: "application/json" }),
  webhookEndpoints
);

// Body parsers for all OTHER routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get logs of api
const morganFormat = ":method :url :status :response-time ms";

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

// Initialize router for controllers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/wishlist", whishListRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/payment", paymentRouter); // Now AFTER body parsers

export default app;

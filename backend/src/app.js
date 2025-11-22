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
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();

// Wrap express in HTTP server
const server = createServer(app);

// Create socket server with its own CORS
const io = new Server(server, {
  cors: {
    origin: process.env.CROSS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  },
});

// Socket event handler
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// EXPRESS CORS
app.use(
  cors({
    origin: process.env.CROSS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

// Stripe webhook FIRST
app.post(
  "/api/v1/payment/stripe/webhook",
  express.raw({ type: "application/json" }),
  webhookEndpoints
);

// Body parsers for other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
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

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/wishlist", whishListRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/payment", paymentRouter);

// Export for use in entry point AND in controllers
export { server, io };
export default app;

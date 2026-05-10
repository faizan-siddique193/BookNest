import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`,
    );

    logger.info(
      `MongoDB connected. DB host: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error?.message || error}`);
    process.exit(1);
  }
};

export default connectDB;

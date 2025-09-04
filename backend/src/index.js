import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { startCronJobs } from "./utils/cronJobs.js";
dotenv.config({
  path: "./env",
});
connectDB()
  .then(() => {
    app.on("err", () => {
      console.log("App listen Error :: Error ::", err);
      throw err;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongodb connection is failed !!", err);
  });

//   start cron job
startCronJobs();

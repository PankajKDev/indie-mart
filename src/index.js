import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/index.js";

dotenv.config({
  path: "./.env",
});

connectDB().then(() => {
  app.on("error", (error) => {
    console.log(`The app encountered an error : ${error}`);
    throw error;
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`server active at http://localhost:${process.env.PORT}`);
});

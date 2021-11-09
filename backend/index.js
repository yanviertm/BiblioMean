import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";
import book from "./routes/book.js";
import customer from "./routes/customer.js";
import provider from "./routes/provider.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/book",book);
app.use("/api/customer",customer);
app.use("/api/provider",provider);

app.listen(process.env.PORT, () => {
  console.log("Server Running on port " + process.env.PORT);
});

db.dbConnection();

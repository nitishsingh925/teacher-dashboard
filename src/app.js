import express from "express";
import AuthRoute from "./routes/login.route.js";
import StudentRoute from "./routes/student.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.urlencoded({ extended: true })); //accept request from x-www-form-urlencoded
app.use(express.json()); // for parsing application/json (for geting request data) -> not found json data that's why using this
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.static("uploads"));
app.use("/api/v1", AuthRoute);
app.use("/api/v1", StudentRoute);

// app.use("*", (req, res) => res.status(404).send("Route Not Found"));

export default app;

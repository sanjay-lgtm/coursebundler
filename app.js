import express from "express";
import { config } from "dotenv";
import ErrorMiddleWare from "./Middleware/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config({
  path: "./Config/config.env",
});
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    
  })
);

import course from "./routes/Courseroutes.js";
import user from "./routes/usreroutes.js";
import payment from "./routes/paymentroute.js";
import other from "./routes/Otherroutes.js";

app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other);

export default app;

app.get("/", (req, res) =>
  res.send(
    `<h1>Server is Working,Click <a href=${process.env.FRONTEND_URL}></a>  to visit frontend.</h1>`
  )
);

app.use(ErrorMiddleWare);

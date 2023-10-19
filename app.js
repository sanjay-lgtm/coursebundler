import express from "express";
import { config } from "dotenv";
import ErrorMiddleWare from './Middleware/Error.js';
import cookieParser from "cookie-parser";
config({
  path: "./Config/config.env",
});
const app = express();
app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({
  extended:true,
})
);


import course from './routes/Courseroutes.js';
import user from './routes/usreroutes.js';
import payment from './routes/paymentroute.js';
import other from './routes/Otherroutes.js';

app.use("/api/v1",course)
app.use("/api/v1",user)
app.use("/api/v1",payment)
app.use("/api/v1",other)


export default app;

app.use(ErrorMiddleWare)
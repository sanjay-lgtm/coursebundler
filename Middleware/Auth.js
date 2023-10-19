import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { User } from "../Modals/User.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Not logged in", 401));

  const decoded = jwt.verify(token, process.env.SECRET);

  req.user = await User.findById(decoded._id);
  next();
});

export const auhorizedAdmin = (req, res, next) => {
  if (req.user.role != "admin")
    return next(
      new ErrorHandler(`${req.user.role} is not allowed to this resourse`, 403)
    );
  next();
};

export const auhorizeSubscriber = (req, res, next) => {
  if (req.user.subscription.status !== "active" && req.user.role !== "admin")
    return next(
      new ErrorHandler(`Only Subscriber can access this resourse`, 403)
    );
  next();
};

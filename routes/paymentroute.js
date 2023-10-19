import express from "express";
import { isAuthenticated } from "../Middleware/Auth.js";
import { buySubscription, cancelSubscription, getRazorPayKey, paymentVerification } from "../Controllers/paymentcontroller.js";

const router = express.Router();

router.route("/subscribe").get(isAuthenticated,buySubscription)
router.route("/paymentverification").post(isAuthenticated,paymentVerification)

router.route("/razorpaykey").get(getRazorPayKey);
router.route("/subscribe/cancel").delete(isAuthenticated,cancelSubscription)

export default router;

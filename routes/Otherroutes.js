import express from "express";
import { contact, courseRequest, getDashboardStats } from "../Controllers/Othercontroller.js";
import { auhorizedAdmin, isAuthenticated } from "../Middleware/Auth.js";

const router = express.Router();

router.route("/contact").post(contact)

router.route("/courserequest").post(courseRequest)
router.route("/admin/stats").get(isAuthenticated,auhorizedAdmin,getDashboardStats)

export default router;

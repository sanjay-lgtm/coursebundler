import express from "express";
import {
  updateProfilePicture,
  UpdateProfile,
  changePassword,
  getMyProfile,
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
  addToPlaylist,
  removeFromPlaylist,
  getAllUsers,
  updateUserRole,
  deleteUser,
  deleteMyProfile,
} from "../Controllers/usreController.js";
import { auhorizedAdmin, isAuthenticated } from "../Middleware/Auth.js";
import singleUpload from "../Middleware/Multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, getMyProfile);
router.route("/me").delete(isAuthenticated, deleteMyProfile);

router.route("/changePassword").put(isAuthenticated, changePassword);

router.route("/updateProfile").put(isAuthenticated, UpdateProfile);
router
  .route("/updateProfilePicture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);

router.route("/forgotpassword").post(forgotPassword);

router.route("/resetpassword/:token").put(resetPassword);
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

router.route("/admin/users").get(isAuthenticated, auhorizedAdmin, getAllUsers);
router
  .route("/admin/user/:id")
  .put(isAuthenticated, auhorizedAdmin, updateUserRole)
  .delete(isAuthenticated, auhorizedAdmin, deleteUser);

router.route

export default router;

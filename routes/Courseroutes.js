import express from "express";
import {
  addLecture,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseLectures,
} from "../Controllers/CourseController.js";
import singleUpload from "../Middleware/Multer.js";
import { auhorizeSubscriber, auhorizedAdmin, isAuthenticated } from "../Middleware/Auth.js";

const router = express.Router();

router.route("/courses").get(getAllCourses);
router
  .route("/createcourse")
  .post(isAuthenticated, auhorizedAdmin, singleUpload, createCourse);
router
  .route("/course/:id")
  .get(isAuthenticated,auhorizeSubscriber, getCourseLectures)
  .post(isAuthenticated, auhorizedAdmin, singleUpload, addLecture)
  .delete(isAuthenticated, auhorizedAdmin, deleteCourse);

router.route("/lecture")
.delete(isAuthenticated, auhorizedAdmin,deleteLecture);
export default router;

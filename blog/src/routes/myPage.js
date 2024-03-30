import express from "express";
import { MyPageController } from "../app/controllers/myPageController.js";

const router = express.Router();

router.get("/stored/courses", MyPageController.storedCourses);

export default router;

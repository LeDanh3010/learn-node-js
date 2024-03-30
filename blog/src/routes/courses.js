import express from "express";
import { coursesController } from "../app/controllers/CoursesController.js";

const router = express.Router();

router.get("/create", coursesController.create);
router.post("/store", coursesController.store);
router.get("/:id/edit", coursesController.edit);
router.delete("/:id", coursesController.delete);
router.put("/:id", coursesController.update);
router.get("/:slug", coursesController.courses);

export default router;

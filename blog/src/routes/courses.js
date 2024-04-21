import express from "express";
import { coursesController } from "../app/controllers/CoursesController.js";

const router = express.Router();

router.get("/create", coursesController.create);
router.post("/store", coursesController.store);
router.get("/:id/edit", coursesController.edit);
router.put("/:id", coursesController.update);
router.post("/handle-removeAll-Form", coursesController.handleAllForm);
router.delete("/:id", coursesController.delete);
router.post("/handle-ForceRemove-form", coursesController.handleAllForm);
router.delete("/:id/force", coursesController.forceRemove);
router.post("/handle-restore-form", coursesController.handleAllForm);
router.patch("/:id/restore", coursesController.restore);
router.get("/:slug", coursesController.courses);

export default router;

import express from "express";
import { newSiteController } from "../app/controllers/SIteController.js";

const router = express.Router();

router.get("/search", newSiteController.search);
router.get("/", newSiteController.home);
export default router;

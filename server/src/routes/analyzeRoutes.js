import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { analyzeGithub, analyzeCode } from "../controllers/analyzeController.js";

const router = express.Router();

router.post("/github", authMiddleware, analyzeGithub);
router.post("/code", authMiddleware, analyzeCode);

export default router;
import express from "express";
import { ProtectRoute } from "../middleware/protectRoute.js";
import {
  createSession,
  endSession,
  getActiveSessions,
  getMyRecentSessions,
  getSessionById,
  joinSession,
} from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", ProtectRoute, createSession);
router.get("/active", ProtectRoute, getActiveSessions);
router.get("/my-recent", ProtectRoute, getMyRecentSessions);
router.get("/:id", ProtectRoute, getSessionById);
router.post("/:id/join", ProtectRoute, joinSession);
router.post("/:id/end", ProtectRoute, endSession);

export default router;

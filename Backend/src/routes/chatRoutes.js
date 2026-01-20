import express from "express";
import { ProtectRoute } from "../middleware/protectRoute";
import { getStreamToken } from "../controllers/chatController";

const router = express.Router();

router.get("/token", ProtectRoute, getStreamToken);
export default router;

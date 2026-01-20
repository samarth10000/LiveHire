import express from "express";

import { getStreamToken } from "../controllers/chatController";
import { ProtectRoute } from "../middleware/protectRoute";

const router = express.Router();

router.get("/token", ProtectRoute, getStreamToken);
export default router;

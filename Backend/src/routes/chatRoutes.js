import express from "express";

import { getStreamToken } from "../controllers/chatController.js";
import { ProtectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/token", ProtectRoute, getStreamToken);
export default router;

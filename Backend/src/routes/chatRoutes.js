import express from "express";
import { ProtectRoute } from "../middleware/protectRoute";

const router = express.Router();

router.get("/token", ProtectRoute, getStreamToken);
export default router;

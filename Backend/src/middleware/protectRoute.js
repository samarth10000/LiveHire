import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const ProtectRoute = [
  requireAuth(),

  async (req, res, next) => {
    try {
      const { userId: clerkId } = req.auth;

      // Clerk already ensures auth, but keeping it safe
      if (!clerkId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await User.findOne({ clerkId });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Attach DB user to request
      req.user = user;

      next();
    } catch (error) {
      console.error("Error in ProtectRoute middleware:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

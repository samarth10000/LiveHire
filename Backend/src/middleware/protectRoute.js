import { requireAuth } from "@clerk/express";
import User from "../models/User";

export const ProtectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;

      if (!clerkId)
        return res.status(401).json({ msg: "Unauthorized - invalid token " });
      // find User in database by clerk id

      const user = await User.findOne({ clerkId });
      if (!user) return res.status(404).json({ msg: "User not found " });

      // attach user to the request
      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protecRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

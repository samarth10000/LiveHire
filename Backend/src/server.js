import express from "express";
import { ENV } from "./lib/env.js";
import Path from "path";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";

import chatRoutes from "./routes/chatRoutes.js";
const app = express();

const __dirname = Path.resolve();

//MiddleWares

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware()); // this adds auth field to request object : req.auth
app.use("/api/chat", chatRoutes);

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/health", (req, res) => {
  res.status(200).json({
    msg: "success from the api ",
  });
});

//when you pass an array of middlware to Express it automatically flattens and executes them sequentially , one by one

// app.get("/video-calls", ProtectRoute, (req, res) => {
//   //when you hit next() in the middleware it will go to next part like status and json formation
//   res.status(200).json({
//     msg: "this is the Video Call endpoint and this is protected  ",
//   });
// });

// REMOVED THE PRODUCTION STATIC FILE SERVING
// Since Frontend is deployed separately on Vercel

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("Server is running on port number 🟩", ENV.PORT);
    });
  } catch (error) {
    console.error(" 😢 Error Try Again Database is not Connected ", error);
  }
};

startServer();

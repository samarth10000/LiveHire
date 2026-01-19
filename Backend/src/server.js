import express from "express";
import { ENV } from "./lib/env.js";
import Path from "path";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./src/inngest";

const app = express();

const __dirname = Path.resolve();

//MiddleWares

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "success from the api ",
  });
});
app.get("/health", (req, res) => {
  res.status(200).json({
    msg: "success from the api ",
  });
});

app.get("/Books", (req, res) => {
  res.status(200).json({
    msg: "this is the books api endpoint ",
  });
});

if (ENV.NODE_ENV === "production") {
  app.use(express.static(Path.join(__dirname, "../Frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(Path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}

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

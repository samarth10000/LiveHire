import express from "express";
import { ENV } from "./lib/env.js";
import Path from "path";
import { connectDB } from "./lib/db.js";

const app = express();

const __dirname = Path.resolve();

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

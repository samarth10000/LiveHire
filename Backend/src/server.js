import express from "express";
import { ENV } from "./lib/env.js";
import Path from "path";

const app = express();

const __dirname = Path.resolve();

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
app.listen(3000, () => {
  console.log("Server is running on port number", ENV.PORT);
});

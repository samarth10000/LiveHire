import express from "express";
import { ENV } from "./lib/env.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "success from the api ",
  });
});

console.log(ENV.PORT);
console.log(ENV.DB_URL);

app.listen(3000, () => {
  console.log("Server is running on port number", ENV.PORT);
});

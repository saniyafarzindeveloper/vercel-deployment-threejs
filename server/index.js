import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import dalleRoutes from "./routes/dalle.routes.js";
// import path from "path";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

dotenv.config();

const app = express();

//setting middleware
app.use(cors());

if (process.env.NODE_ENV === "production") {
  // const path = require("path");
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  app.use(express.static(path.resolve(__dirname, "client", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "dist", "index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}


//trying again
//setting the limit
app.use(express.json({ limit: "50mb" }));

//consuming dalle routes
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "HIIIIIIIIII from DALL-E" });
});

//listening
app.listen(8080, () => {
  console.log("server has started on port 8080");
});

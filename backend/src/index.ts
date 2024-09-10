// src/index.ts
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import dataSource from "./config/ormconfig";
import { globalErrorHandler } from "./utils/errorHandler";
import routes from "./routes";
import { responseMiddleware } from "./utils/responseMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

dataSource
  .initialize()
  .then(() => {
    console.log("Connected to the database!");

    app.use(responseMiddleware);
    
    app.use("/api/", routes);
    
    app.use(globalErrorHandler);

    app.listen(PORT, () => {
      console.log(`Server running at PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// src/index.ts
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import dataSource from "./config/ormconfig";
import { UserController } from "./controllers/UserController";
import { globalErrorHandler } from "./utils/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

dataSource.initialize().then(() => {
  console.log("Connected to the database!");

  const userController = new UserController();

  app.get("/users", (req, res, next) => userController.getUsers(req, res, next));

  app.use(globalErrorHandler);

  app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
  });
}).catch(error => {
  console.error("Error connecting to the database:", error);
});

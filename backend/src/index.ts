import "reflect-metadata";
import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import dataSource from "./config/ormconfig"; // Importa la configuración de TypeORM
import { UserController } from "./controllers/UserController"; // Importa el controlador

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Configuramos CORS
app.use(cors());

// Configuramos body-parser
app.use(bodyParser.json());

dataSource.initialize().then(() => {
  console.log("Connected to the database!");

  const userController = new UserController();

  // Ruta para obtener usuarios
  app.get("/users", (req, res) => userController.getUsers(req, res));

  app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
  });
}).catch(error => {
  console.error("Error connecting to the database:", error);
});

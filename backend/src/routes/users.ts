import express from "express";
import { UserController } from "../controllers/UserController";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getUsers.bind(userController));
router.post("/", userController.createUser.bind(userController));

export default router;
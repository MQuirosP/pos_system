import express from "express";
import { UserController } from "../controllers/UserController";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getUsers.bind(userController));
router.post("/", userController.createUser.bind(userController));
router.get("/:id", userController.getUserById.bind(userController));

export default router;
import { Router } from "express";
import { AuthController } from "@controllers/auth.controller";
import { UserController } from "../controllers/users.controller";

const router = Router();
const authController = new AuthController();
const userController = new UserController()

router.post("/login", authController.login.bind(authController));
router.post("/logout", authController.logout.bind(authController));
router.get("/usernames", userController.getUsers.bind(userController));

export default router;
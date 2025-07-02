import { UserLoginDTO } from '@dtos/auth.dto';
import { Router } from "express";
import { AuthController } from "@controllers/auth.controller";
import { UserController } from "../controllers/users.controller";
import { validateDTO } from "../middlewares/validateDTO.middleware";

const router = Router();
const authController = new AuthController();
const userController = new UserController()

router.post("/login", validateDTO(UserLoginDTO), authController.login.bind(authController));
router.post("/logout", authController.logout.bind(authController));
router.get("/usernames", userController.getUsers.bind(userController));

export default router;
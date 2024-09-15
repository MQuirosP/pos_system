import express from "express";
import { UserController } from "../controllers/UserController";
import { validateDTO } from "../middlewares/validateDTO";
import { UserCreateDTO, UserUpdateDTO } from "../dtos/users.dto";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getUsers.bind(userController));
router.post(
  "/",
  validateDTO(UserCreateDTO),
  userController.createUser.bind(userController)
);
router.get("/:id", userController.getUserById.bind(userController));
router.put(
  "/:id",
  validateDTO(UserUpdateDTO),
  userController.updateUser.bind(userController)
);
router.delete("/:id", userController.deleteUser.bind(userController));

export default router;

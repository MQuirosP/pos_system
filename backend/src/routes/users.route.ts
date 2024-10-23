import express from "express";
import { UserController } from "@controllers/users.controller";
import { validateDTO } from "@middlewares/validateDTO";
import { UserCreateDTO, UserUpdateDTO } from "@dtos/users.dto";

const router = express.Router();
const userController = new UserController();

router.post(
  "/",
  validateDTO(UserCreateDTO),
  userController.createUser.bind(userController)
);
router.get("/", userController.getUsers.bind(userController));
router.get("/id/:id", userController.getUserById.bind(userController));
router.get(
  "/password/:id",
  userController.comparePassword.bind(userController)
);
router.put(
  "/:id",
  validateDTO(UserUpdateDTO),
  userController.updateUser.bind(userController)
);
router.delete("/:id", userController.deleteUser.bind(userController));

export default router;

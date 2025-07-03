import express from "express";
import { UserController } from "@controllers/users.controller";
import { validateDTO } from "@middlewares/validateDTO.middleware";
import { UserCreateDTO, UserUpdateDTO } from "@dtos/users.dto";
import { validateIdInUrl } from "../middlewares/validateIdParams.middleware";

const router = express.Router();
const userController = new UserController();

router.post(
  "/",
  validateDTO(UserCreateDTO),
  userController.createUser.bind(userController)
);
router.get("/", userController.getUsers.bind(userController));
router.get("/:id", validateIdInUrl("id"), userController.getUserById.bind(userController));
router.get(
  "/password/:id", validateIdInUrl("id"),
  userController.comparePassword.bind(userController)
);
router.put(
  "/:id", validateIdInUrl("id"),
  validateDTO(UserUpdateDTO),
  userController.updateUser.bind(userController)
);
router.delete("/:id", validateIdInUrl("id"), userController.deleteUser.bind(userController));

export default router;

import express from "express";
import { CategoryController } from "@controllers/categories.controller";
import { validateIdInUrl } from "../middlewares/validateIdParams.middleware";

const router = express.Router();
const categoryController = new CategoryController();

router.post("/", categoryController.createCategory.bind(categoryController));
router.get("/", categoryController.getCategories.bind(categoryController));
router.get("/:id", validateIdInUrl("id"), categoryController.getCategoryById.bind(categoryController));
router.put("/:id", validateIdInUrl("id"), categoryController.updateCategory.bind(categoryController));
router.delete("/:id", validateIdInUrl("id"), categoryController.deleteCategory.bind(categoryController));

export default router;
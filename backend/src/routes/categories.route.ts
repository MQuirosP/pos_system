import express from "express";
import { CategoryController } from "@controllers/categories.controller";

const router = express.Router();
const categoryController = new CategoryController();

router.post("/", categoryController.createCategory.bind(categoryController));
router.get("/", categoryController.getCategories.bind(categoryController));
router.get("/:id", categoryController.getCategoryById.bind(categoryController));
router.put("/:id", categoryController.updateCategory.bind(categoryController));
router.delete("/:id", categoryController.deleteCategory.bind(categoryController));

export default router;
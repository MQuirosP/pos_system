import dataSource from "@config/ormconfig";
import { Request, Response, NextFunction } from "express";
import { Categories } from "@entities/categories.entity";
import { CategoryServices } from "@services/categories.services";

export class CategoryController {
  private readonly categoryService: CategoryServices;

  constructor() {
    const categoryRepository = dataSource.getRepository(Categories);
    this.categoryService = new CategoryServices(categoryRepository);
  }

  private async handleControllerOperation(
    req: Request,
    res: Response,
    next: NextFunction,
    operation: () => Promise<any>
  ) {
    try {
      await operation();
    } catch (error) {
      next(error);
    }
  }

  createCategory(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const categoryData = req.body;
      const newCategory = await this.categoryService.createCategory(
        categoryData
      );

      return res.success(newCategory, "Category created successfully.", 201);
    });
  }

  getCategories(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const { name } = req.query;
      let categories: Categories[] = [];

      if (name && typeof name === "string" && name.trim() !== "") {
        categories = await this.categoryService.getCategoryByName(name);
      } else {
        categories = await this.categoryService.fetchAllCategories();
      }

      const responseMessage =
        categories.length === 0
          ? "No categories found."
          : "All categories fetched successfully.";

      return res.success(categories, responseMessage, 200);
    });
  }

  getCategoryById(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const catId = parseInt(req.params.id);
      const category = await this.categoryService.fetchCategoryByPK(catId);

      return res.success(category, "Category fetched successfully.", 200);
    });
  }

  updateCategory(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const catId = parseInt(req.params.id);
      const categoryData = req.body;

      const updatedCategory = await this.categoryService.updateCategory(
        catId,
        categoryData
      );

      return res.success(updatedCategory, "Category updated successfully.");
    });
  }

  deleteCategory(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const catId = parseInt(req.params.id);
      const categoryToDelete = await this.categoryService.fetchCategoryByPK(
        catId
      );
      await this.categoryService.deleteCategory(catId);

      return res.success(
        categoryToDelete,
        "Category deleted successfully.",
        200
      );
    });
  }
}

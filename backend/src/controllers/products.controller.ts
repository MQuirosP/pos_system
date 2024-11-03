import {
  ProductCreateDTO,
  ProductUpdateDTO,
  ProductResponseDTO,
} from "@dtos/products.dto";
import { Request, Response, NextFunction } from "express";
import dataSource from "@config/ormconfig";
import { Product } from "@entities/products.entity";
import { ProductService } from "@services/products.services";
import { CategoryServices } from "../services/categories.services";
import { Categories } from "../database/entities/categories.entity";

export class ProductController {
  private readonly productService: ProductService;
  private readonly categoryService: CategoryServices;

  constructor() {
    const productRepository = dataSource.getRepository(Product);
    const categoryRepository = dataSource.getRepository(Categories);
    this.productService = new ProductService(productRepository);
    this.categoryService = new CategoryServices(categoryRepository)
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productData = new ProductCreateDTO(req.body);
      await productData.validate();
      const newProduct: any = await this.productService.createProduct(productData);

      const category = await this.categoryService.fetchCategoryByPK(newProduct.category_id)
      const productResponseDTO = new ProductResponseDTO({
        ...newProduct,
        category_name: category.category_name,
    });

      return res.success(
        productResponseDTO,
        "Product created successfully.",
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = parseInt(req.params.id);
      const product = await this.productService.getProductByPK(productId);

      return res.success(
        new ProductResponseDTO(product),
        "Product fetched successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;
      let products: Product[] = [];

      if (name && typeof name === "string" && name.trim() !== "") {
        products = await this.productService.getProductByName(name);
      } else {
        products = await this.productService.fetchAllProducts();
      }
      const productResponseDTOs = products?.map(
        (product) => new ProductResponseDTO(product)
      );
      const responseMessage =
        productResponseDTOs.length === 0
          ? "No products found."
          : "All products fetched successfully.";
      return res.success(productResponseDTOs, responseMessage, 200);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = parseInt(req.params.id);
      const productUpdateDTO = new ProductUpdateDTO(req.body);

      await productUpdateDTO.validate();
      const updatedProduct = await this.productService.updateProduct(
        productId,
        productUpdateDTO
      );

      return res.success(
        new ProductResponseDTO(updatedProduct),
        "Product updated successfully."
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = parseInt(req.params.id);
      const productToDelete = await this.productService.getProductByPK(
        productId
      );

      await this.productService.deleteProduct(productId);
      return res.success(
        new ProductResponseDTO(productToDelete),
        "Product deleted successfully.",
        200
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

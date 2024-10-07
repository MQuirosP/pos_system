import {
  ProductCreateDTO,
  ProductUpdateDTO,
  ProductResponseDTO,
} from "../dtos/products.dto";
import { Request, Response, NextFunction, json } from "express";
import dataSource from "../config/ormconfig";
import { Product } from "../database/entities/products.entity";
import { ProductService } from "../services/ProductService";

export class ProductController {
  private readonly productService: ProductService;

  constructor() {
    const productRepository = dataSource.getRepository(Product);
    this.productService = new ProductService(productRepository);
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productData = new ProductCreateDTO(req.body);
      await productData.validate();
      const newProduct = await this.productService.createProduct(productData);

      return res.success(
        new ProductResponseDTO(newProduct),
        "Product created successfully.",
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    const productId = parseInt(req.params.id);
    try {
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
    const { name } = req.query;
    let products: Product[] = [];

    try {
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
    const productId = parseInt(req.params.id);
    try {
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
    const productId = parseInt(req.params.id);
    try {
      const productToDelete = await this.productService.getProductByPK(
        productId
      );

      if (!productToDelete)
        return res.error({ message: "Product not found." }, 404);

      const { affected } = await this.productService.deleteProduct(productId);

      if (!affected)
        return res.error({ message: "Failed to delete product." }, 500);

      return res.success(
        new ProductResponseDTO(productToDelete),
        "Product deleted successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }
}

import { Request, Response, NextFunction, json } from "express";
import dataSource from "../config/ormconfig";
import { Product } from "../entities/products.entity";
import { ProductService } from "../services/ProductService";
import { error } from "console";

export class ProductController {
  private readonly productService: ProductService;

  constructor() {
    const productRepository = dataSource.getRepository(Product);
    this.productService = new ProductService(productRepository);
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productData = req.body;
      const newProduct = await this.productService.createProduct(productData);
      return res.success(newProduct, "Product created successfully.", 201);
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this.productService.getAllProducts();
      if (products.length === 0) {
        return res.success(products, "No products found.", 200);
      }
      return res.success(products, "Products fetched successfully.", 200);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = parseInt(req.params.id);
      const product = await this.productService.getProductByPK(productId);

      if (!product) {
        return res.error({ message: "Product not found." }, 400);
      }
      return res.success(product, "Product fetched successfully.", 200);
    } catch (error) {
      next(error);
    }
  }

  async getProductByName(req: Request, res: Response, next: NextFunction) {
    try {
      const productName = req.params.name.trim().toLowerCase();
      const products = await this.productService.getProductByName(productName);
      if (!products) {
        return res.error({ message: "Products not found" }, 400);
      }
      return res.success(products, "Products fetched successfully.", 200);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const productId = parseInt(req.params.id);
        const updates = req.body;
        const updatedProduct = await this.productService.updateProduct(
            productId, updates
        );

        if(!updatedProduct) {
            next(error);
        }

        return res.success(updatedProduct, "User updated successfully.")
    } catch (error) {
        next(error)
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction)  {
    try {
        const productId = parseInt(req.params.id);
        const productToDelete = await this.productService.getProductByPK(productId);

        if( !productToDelete ) {
            return res.error({ message: "Product not found." }, 404);
        }

        const deleteResult = await this.productService.deleteProduct(productId);

        if( !deleteResult || deleteResult.affected === 0 ) {
            return res.error({ message: "Failed to delete product."}, 500);
        }
            
        return res.success(productToDelete, "Product deleted successfully.", 200);
    } catch (error) {
        next(error)
    }
  }
}

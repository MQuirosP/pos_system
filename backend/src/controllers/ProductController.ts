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

      const productResponseDTO = new ProductResponseDTO(newProduct!);

      return res.success(
        productResponseDTO,
        "Product created successfully.",
        201
      );
    } catch (error) {
      next(error);
    }
  }

  // async getProducts(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const products = await this.productService.getAllProducts();
  //     if (products.length === 0) {
  //       return res.success(products, "No products found.", 200);
  //     }

  //     const productResponseDTOs = products.map(
  //       (products) => new ProductResponseDTO(products)
  //     );

  //     const responseMessage =
  //       productResponseDTOs.length === 0
  //         ? "No products found."
  //         : "Products fetched successfully.";
  //     return res.success(productResponseDTOs, responseMessage, 200);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = parseInt(req.params.id);
      const product = await this.productService.getProductByPK(productId);

      if (!product) {
        return res.error({ message: "Product not found." }, 400);
      }
      const productResponseDTO = new ProductResponseDTO(product);
      return res.success(
        productResponseDTO,
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
      let products: Product[] | null = [];

      if (name && typeof name === "string" && name.trim() !== "") {
        products = await this.productService.getProductByName(name as string);
      } else {
        products = await this.productService.getAllProducts();
      }
      const productResponseDTOs = products?.map(
        (product) => new ProductResponseDTO(product)
      );
      const responseMessage =
        productResponseDTOs?.length === 0
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

      if (!updatedProduct) {
        return res.error(
          { message: "Failed to update product." },
          400
        )
      }
      const productResponseDTO = new ProductResponseDTO(updatedProduct!)
      return res.success(productResponseDTO, "Product updated successfully.");
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

      if (!productToDelete) {
        return res.error({ message: "Product not found." }, 404);
      }

      const deleteResult = await this.productService.deleteProduct(productId);

      if (!deleteResult || deleteResult.affected === 0) {
        return res.error({ message: "Failed to delete product." }, 500);
      }
      const productResponseDTO = new ProductResponseDTO(productToDelete)
      return res.success(productResponseDTO, "Product deleted successfully.", 200);
    } catch (error) {
      next(error);
    }
  }
}

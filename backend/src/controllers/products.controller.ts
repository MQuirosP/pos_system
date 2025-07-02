import {
  ProductCreateDTO,
  ProductUpdateDTO,
  ProductResponseDTO,
} from "@dtos/products.dto";
import { Request, Response, NextFunction } from "express";
import dataSource from "@config/ormconfig";
import { Product } from "@entities/products.entity";
import { ProductService } from "@services/products.services";

export class ProductController {
  private readonly productService: ProductService;

  constructor() {
    const productRepository = dataSource.getRepository(Product);
    this.productService = new ProductService(productRepository);
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

  async createProduct(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      ProductCreateDTO.validateKeys(Object.keys(req.body));
      const productData = new ProductCreateDTO(req.body);
      await productData.validate();
      const newProduct = await this.productService.createProduct(productData);

      return res.success(
        new ProductResponseDTO(newProduct),
        "Product created successfully.",
        201
      );
    });
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const productId = parseInt(req.params.id);
      const product = await this.productService.fetchProductByPK(productId);

      return res.success(
        new ProductResponseDTO(product),
        "Product fetched successfully.",
        200
      );
    });
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
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
    });
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      ProductUpdateDTO.validateKeys(Object.keys(req.body));
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
    });
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const productId = parseInt(req.params.id);
      const productToDelete = await this.productService.fetchProductByPK(
        productId
      );

      await this.productService.deleteProduct(productId);
      return res.success(
        new ProductResponseDTO(productToDelete),
        "Product deleted successfully.",
        200
      );
    });
  }
}

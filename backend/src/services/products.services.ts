import { Product } from "@entities/products.entity";
import { Repository, ILike } from "typeorm";
import { handleDatabaseError } from "@middlewares/databaseErrorHandler";
import { AppError } from "@middlewares/errorHandler.middleware";
import { ProductCreateDTO } from "@dtos/products.dto";

export class ProductService {
  private productRepository: Repository<Product>;

  constructor(productRepository: Repository<Product>) {
    this.productRepository = productRepository;
  }

  async createProduct(productData: ProductCreateDTO): Promise<Product> {
    try {
      const newProduct = this.productRepository.create(productData);
      return await this.productRepository.save(newProduct);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async getProductByPK(productId: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { product_id: productId },
      });

      if (!product) throw new AppError("Product not found.", 404);

      return product;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async fetchAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.find({
        relations: ["category"]
      });
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async getProductByName(productName: string): Promise<Product[] | []> {
    try {
      return await this.productRepository.find({
        where: {
          name: ILike(`%${productName}%`),
        },
      });
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async updateProduct(
    productId: number,
    updates: Partial<Product>
  ): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { product_id: productId },
      });

      if (!product) throw new AppError("Product not found.", 404);

      Object.assign(product, updates);

      return await this.productRepository.save(product);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async deleteProduct(productId: number): Promise<void> {
    try {
      const product = await this.productRepository.findOne({
        where: { product_id: productId },
      });

      if (!product) throw new AppError("Product not found.", 400);
      
      await this.productRepository.delete(productId);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }
}

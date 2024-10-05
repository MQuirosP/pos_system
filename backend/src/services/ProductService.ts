import { Product } from "../database/entities/products.entity";
import dataSource from "../config/ormconfig";
import { Repository, EntityManager, Like, DeleteResult, ILike } from "typeorm";
import { handleDatabaseError } from "../middlewares/databaseErrorHandler";
import { AppError } from "../middlewares/errorHandler";
import { ProductCreateDTO } from "../dtos/products.dto";

export class ProductService {
  // private productRepository: Repository<Product>;

  constructor(private productRepository: Repository<Product>) {
    // this.productRepository = productRepository;
  }

  async createProduct(productData: ProductCreateDTO): Promise<Product> {
    try {
      return await dataSource.manager.transaction(
        async (transactionalEntityManager: EntityManager) => {
          const newProduct = transactionalEntityManager.create(
            Product,
            productData
          );
          return await transactionalEntityManager.save(newProduct);
        }
      );
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async fetchAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async getProductByPK(productId: number): Promise<Product | null> {
    try {
      const product = await this.productRepository.findOne({
        where: { product_id: productId },
      });
      return product;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async getProductByName(productName: string): Promise<Product[] | null> {
    try {
      const product = await this.productRepository.find({
        where: {
          name: ILike(`%${productName}%`),
        },
      });
      return product.length > 0 ? product : null;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async updateProduct(
    productId: number,
    updates: Partial<Product>
  ): Promise<Product | null> {
    try {
      const product = await this.productRepository.findOne({
        where: { product_id: productId },
      });

      if (!product) {
        throw handleDatabaseError(product);
      }

      Object.assign(product, updates);

      return await this.productRepository.save(product);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async deleteProduct(productId: number): Promise<DeleteResult | null> {
    try {
      const product = await this.productRepository.findOne({
        where: { product_id: productId },
      });

      if (!product) {
        throw new AppError("Product not found.", 400);
      }
      return await this.productRepository.delete(productId);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }
}

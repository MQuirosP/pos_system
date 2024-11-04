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

  private async handleDatabaseOperation<T>(
    operation: () => Promise<T>
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  private async findProductById(productId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { product_id: productId },
      // relations: ["category"],
    });
    if (!product) throw new AppError("Product not found.", 404);
    return product;
  }

  async createProduct(productData: ProductCreateDTO): Promise<Product> {
    return this.handleDatabaseOperation(async () => {
      const newProduct = this.productRepository.create(productData);
      return await this.productRepository.save(newProduct);
    });
  }

  async fetchAllProducts(): Promise<Product[]> {
    return this.handleDatabaseOperation(async () => {
      return await this.productRepository.find({
        // relations: ["category"],
      });
    });
  }

  async fetchProductByPK(productId: number): Promise<Product> {
    return this.handleDatabaseOperation(() => this.findProductById(productId));
  }

  async getProductByName(productName: string): Promise<Product[] | []> {
    return this.handleDatabaseOperation(async () => {
      const products = await this.productRepository.find({
        where: {
          name: ILike(`%${productName}%`),
        },
        // relations: ["category"],
      });
      return products;
    });
  }

  async updateProduct(
    productId: number,
    updates: Partial<Product>
  ): Promise<Product> {
    return this.handleDatabaseOperation(async () => {
      const product = await this.findProductById(productId);
      Object.assign(product, updates);
      return await this.productRepository.save(product);
    });
  }

  async deleteProduct(productId: number): Promise<void> {
    return this.handleDatabaseOperation(async () => {
      const product = await this.findProductById(productId);
      await this.productRepository.delete(product.product_id);
    });
  }
}

import { Product } from './../entities/products.entity';
import dataSource from "../config/ormconfig";
import { Repository, EntityManager, DeleteResult } from "typeorm";
import { AppError } from "../middlewares/errorHandler";
import { handleDatabaseError } from "../middlewares/databaseErrorHandler";

export class ProductService {
    private productRepository: Repository<Product>;

    constructor(productRepository: Repository<Product>) {
        this.productRepository = productRepository;
    }

    async createProduct(productData: Product): Promise<Product> {
        try {
            return await dataSource.manager.transaction(
                async (transactionalEntityManager: EntityManager) => {
                    const newProduct = transactionalEntityManager.create(Product, productData);
                    return await transactionalEntityManager.save(newProduct);
                }
            )
        } catch (error) {
            throw handleDatabaseError(error)
        }
    }
}
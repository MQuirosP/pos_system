import { Request, Response, NextFunction } from "express";
import dataSource from "../config/ormconfig";
import { Product } from "../entities/products.entity";
import { error } from "console";
import { ProductService } from "../services/ProductService";

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
            return res.success(newProduct, "Product created successfully.", 201)
        } catch (error) {
            next(error);
        }
    }
}
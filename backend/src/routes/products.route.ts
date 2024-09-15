import { ProductController } from '../controllers/ProductController';
import express from 'express';

const router = express.Router();
const productController = new ProductController();

router.post("/", productController.createProduct.bind(productController))

export default router;
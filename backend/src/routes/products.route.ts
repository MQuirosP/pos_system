import { ProductController } from "../controllers/ProductController";
import express from "express";

const router = express.Router();
const productController = new ProductController();

router.post("/", productController.createProduct.bind(productController));
router.get("/", productController.getProducts.bind(productController));
router.get("/id/:id", productController.getProductById.bind(productController));
router.get("/name/:name", productController.getProductByName.bind(productController));
router.put("/:id", productController.updateProduct.bind(productController));
router.delete("/:id", productController.deleteProduct.bind(productController));

export default router;

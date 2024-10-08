import { ProductController } from "@controllers/ProductController";
import express from "express";
import { validateDTO } from "@middlewares/validateDTO";
import { ProductCreateDTO, ProductUpdateDTO } from "@dtos/products.dto";

const router = express.Router();
const productController = new ProductController();

router.post(
  "/",
  validateDTO(ProductCreateDTO),
  productController.createProduct.bind(productController)
);
router.get("/", productController.getProducts.bind(productController));
router.get("/:id", productController.getProductById.bind(productController));
router.put(
  "/:id",
  validateDTO(ProductUpdateDTO),
  productController.updateProduct.bind(productController)
);
router.delete("/:id", productController.deleteProduct.bind(productController));

export default router;

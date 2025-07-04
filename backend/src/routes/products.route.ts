import { ProductController } from "@controllers/products.controller";
import express from "express";
import { validateDTO } from "@middlewares/validateDTO.middleware";
import { ProductCreateDTO, ProductUpdateDTO } from "@dtos/products.dto";
import { validateIdInUrl } from "@middlewares/validateIdParams.middleware";

const router = express.Router();
const productController = new ProductController();

router.post(
  "/",
  validateDTO(ProductCreateDTO),
  productController.createProduct.bind(productController)
);
router.get("/", productController.getProducts.bind(productController));
router.get("/:id", validateIdInUrl("id"), productController.getProductById.bind(productController));
router.put(
  "/:id", validateIdInUrl("id"),
  validateDTO(ProductUpdateDTO),
  productController.updateProduct.bind(productController)
);
router.delete("/:id", validateIdInUrl("id"), productController.deleteProduct.bind(productController));

export default router;

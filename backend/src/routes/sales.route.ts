import express from "express";
import { SaleController } from "@controllers/sales.controller";
import { validateDTO } from "@middlewares/validateDTO";
import { SaleCreateDTO, SaleUpdateDTO } from "@dtos/sales.dto";

const router = express.Router();
const saleController = new SaleController();

router.post(
  "/",
  validateDTO(SaleCreateDTO),
  saleController.createSale.bind(saleController)
);
router.get("/", saleController.fetchAllSales.bind(saleController));
router.put(
  "/:doc_number",
  validateDTO(SaleUpdateDTO),
  saleController.cancelSale.bind(saleController)
);

export default router;

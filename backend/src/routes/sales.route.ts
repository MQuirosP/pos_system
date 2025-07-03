import express from "express";
import { SaleController } from "@controllers/sales.controller";
import { validateDTO } from "@middlewares/validateDTO.middleware";
import { SaleCreateDTO, SaleUpdateDTO } from "@dtos/sales.dto";
import { validateIdInUrl } from "../middlewares/validateIdParams.middleware";

const router = express.Router();
const saleController = new SaleController();

router.post(
  "/",
  validateDTO(SaleCreateDTO),
  saleController.createSale.bind(saleController)
);
router.get("/", saleController.fetchAllSales.bind(saleController));
router.get("/:id", validateIdInUrl("id"), saleController.getSaleById.bind(saleController));
router.put(
  "/:doc_number",
  validateDTO(SaleUpdateDTO),
  saleController.cancelSale.bind(saleController)
);

export default router;

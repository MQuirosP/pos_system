import express from "express";
import { NextFunction } from "express";
import { SaleController } from "@controllers/sales.controller";
import { validateDTO } from "@middlewares/validateDTO";
import { SaleCreateDTO, SaleUpdateDTO } from "@dtos/sales.dto";
import { AppError } from "../middlewares/errorHandler";

const router = express.Router();
const saleController = new SaleController();

router.post(
  "/",
  validateDTO(SaleCreateDTO),
  saleController.createSale.bind(saleController)
);
router.get("/", saleController.fetchAllSales.bind(saleController));
router.get(
  "/:doc_number",
  saleController.fetchSaleByDocNumber.bind(saleController)
);
// router.put(
//   "/",
//   (req, res, next: NextFunction) => {
//     next( new AppError("Document number is required.", 400) );
//   }
// );
router.put(
  "/:doc_number",
  validateDTO(SaleUpdateDTO),
  saleController.cancelSale.bind(saleController)
);

export default router;

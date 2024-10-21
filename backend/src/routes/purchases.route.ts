import express from "express";
import { PurchaseController } from "@controllers/purchases.controller";
import { validateDTO } from "@middlewares/validateDTO";
import { PurchaseCreateDTO, PurchaseUpdateDTO } from "@dtos/purchases.dto";

const router = express.Router();
const purchaseController = new PurchaseController();

router.post(
  "/",
  validateDTO(PurchaseCreateDTO),
  purchaseController.createPurchase.bind(purchaseController)
);
router.get("/", purchaseController.fetchAllPurchases.bind(purchaseController));
router.get(
  "/:doc_number",
  purchaseController.fetchPurchaseByDocNumber.bind(purchaseController)
);
router.put(
  "/:doc_number",
  validateDTO(PurchaseUpdateDTO),
  purchaseController.cancelPurchase.bind(purchaseController)
);

export default router;

import express from "express";
import { PurchaseController } from "@controllers/purchases.controller";
import { validateDTO } from "@middlewares/validateDTO.middleware";
import { PurchaseCreateDTO, PurchaseUpdateDTO } from "@dtos/purchases.dto";
import { validateIdInUrl } from "../middlewares/validateIdParams.middleware";

const router = express.Router();
const purchaseController = new PurchaseController();

router.post(
  "/",
  validateDTO(PurchaseCreateDTO),
  purchaseController.createPurchase.bind(purchaseController)
);
router.get("/", purchaseController.getPurchases.bind(purchaseController));
router.get("/:id", validateIdInUrl("id"), purchaseController.getPurchaseById.bind(purchaseController));
router.put(
  "/:doc_number",
  validateDTO(PurchaseUpdateDTO),
  purchaseController.cancelPurchase.bind(purchaseController)
);

export default router;

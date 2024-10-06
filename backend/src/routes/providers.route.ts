import express from "express";
import { ProviderController } from "../controllers/ProviderController";
import { validateDTO } from "../middlewares/validateDTO";
import { ProviderCreateDTO, ProviderUpdateDTO } from "../dtos/providers.dto";

const router = express.Router();
const providerConstroller = new ProviderController();

router.post(
  "/",
  validateDTO(ProviderCreateDTO),
  providerConstroller.createProvider.bind(providerConstroller)
);
router.get("/", providerConstroller.getProviders.bind(providerConstroller));
router.get(
  "/:id",
  providerConstroller.getProviderById.bind(providerConstroller)
);
router.put(
  "/:id",
  validateDTO(ProviderUpdateDTO),
  providerConstroller.updateProvider.bind(providerConstroller)
);
router.delete(
  "/:id",
  providerConstroller.deleteProvider.bind(providerConstroller)
);

export default router;

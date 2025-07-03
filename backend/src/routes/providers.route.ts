import express from "express";
import { ProviderController } from "@controllers/providers.controller";
import { validateDTO } from "@middlewares/validateDTO.middleware";
import { ProviderCreateDTO, ProviderUpdateDTO } from "@dtos/providers.dto";
import { validateIdInUrl } from "../middlewares/validateIdParams.middleware";

const router = express.Router();
const providerConstroller = new ProviderController();

router.post(
  "/",
  validateDTO(ProviderCreateDTO),
  providerConstroller.createProvider.bind(providerConstroller)
);
router.get("/", providerConstroller.getProviders.bind(providerConstroller));
router.get(
  "/:id", validateIdInUrl("id"),
  providerConstroller.getProviderById.bind(providerConstroller)
);
router.put(
  "/:id", validateIdInUrl("id"),
  validateDTO(ProviderUpdateDTO),
  providerConstroller.updateProvider.bind(providerConstroller)
);
router.delete(
  "/:id", validateIdInUrl("id"),
  providerConstroller.deleteProvider.bind(providerConstroller)
);

export default router;

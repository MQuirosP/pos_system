import { CustomerController } from "@controllers/customers.controller";
import express from "express";
import { validateDTO } from "@middlewares/validateDTO.middleware";
import { CustomerCreateDTO, CustomerUpdateDTO } from "@dtos/customers.dto";

const router = express.Router();
const customerController = new CustomerController();

router.post(
  "/",
  validateDTO(CustomerCreateDTO),
  customerController.createCustomer.bind(customerController)
);
router.get("/", customerController.getCustomers.bind(customerController));
router.get("/:id", customerController.getCustomerById.bind(customerController));
router.put(
  "/:id",
  validateDTO(CustomerUpdateDTO),
  customerController.updateCustomer.bind(customerController)
);
router.delete(
  "/:id",
  customerController.deleteCustomer.bind(customerController)
);

export default router;

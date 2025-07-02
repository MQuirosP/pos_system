import { Request, Response, NextFunction } from "express";
import dataSource from "@config/ormconfig";
import { Customer } from "@entities/customers.entity";
import { CustomerService } from "@services/customers.services";
import {
  CustomerCreateDTO,
  CustomerResponseDTO,
  CustomerUpdateDTO,
} from "@dtos/customers.dto";

export class CustomerController {
  private readonly customerService: CustomerService;

  constructor() {
    const customerRepository = dataSource.getRepository(Customer);
    this.customerService = new CustomerService(customerRepository);
  }

  private async handleControllerOperation(
    req: Request,
    res: Response,
    next: NextFunction,
    operation: () => Promise<any>
  ) {
    try {
      await operation();
    } catch (error) {
      next(error);
    }
  }

  createCustomer(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const customerData = req.body as CustomerCreateDTO;
      const newCustomer = await this.customerService.createCustomer(
        customerData
      );

      return res.success(
        new CustomerResponseDTO(newCustomer),
        "Customer created successfully.",
        201
      );
    });
  }

  getCustomers(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const { name } = req.query;
      let customers: Customer[] = [];

      if (name && typeof name === "string" && name.trim() !== "") {
        customers = await this.customerService.getCustomerByName(name);
      } else {
        customers = await this.customerService.fetchAllCustomers();
      }

      const customerResponseDTOs = customers.map(
        (customer) => new CustomerResponseDTO(customer)
      );
      const responseMessage =
        customerResponseDTOs.length === 0
          ? "No customers found."
          : "All customers fetched successfully.";

      return res.success(customerResponseDTOs, responseMessage, 200);
    });
  }

  getCustomerById(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const customerId = parseInt(req.params.id);
      const customer = await this.customerService.getCustomerByPK(customerId);

      return res.success(
        new CustomerResponseDTO(customer),
        "Customer fetched successfully.",
        200
      );
    });
  }

  updateCustomer(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const customerId = parseInt(req.params.id);
      const customerData = req.body as CustomerUpdateDTO;

      const updatedCustomer = await this.customerService.updateCustomer(
        customerId,
        customerData
      );

      return res.success(
        new CustomerResponseDTO(updatedCustomer),
        "Customer updated successfully."
      );
    });
  }

  deleteCustomer(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const customerId = parseInt(req.params.id);
      const customerToDelete = await this.customerService.getCustomerByPK(
        customerId
      );
      await this.customerService.deleteCustomer(customerId);

      return res.success(
        new CustomerResponseDTO(customerToDelete),
        "Customer deleted successfully.",
        200
      );
    });
  }
}

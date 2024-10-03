import { Request, Response, NextFunction } from "express";
import dataSource from "../config/ormconfig";
import { Customer } from "../database/entities/customers.entity";
import { CustomerService } from "../services/CustomerService";
import {
  CustomerCreateDTO,
  CustomerResponseDTO,
  CustomerUpdateDTO,
} from "../dtos/customers.dto";

export class CustomerController {
  private readonly customerService: CustomerService;

  constructor() {
    const customerRepository = dataSource.getRepository(Customer);
    this.customerService = new CustomerService(customerRepository);
  }

  async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customerData = new CustomerCreateDTO(req.body);
      await customerData.validate();
      const newCustomer = await this.customerService.createCustomer(
        customerData
      );

      const customerResponseDTO = new CustomerResponseDTO(newCustomer);
      return res.success(
        customerResponseDTO,
        "Customer created successfully.",
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async getCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;
      let customers: Customer[] | null = null;

      if (name && typeof name === "string" && name.trim() !== "") {
        customers = await this.customerService.getCustomerByName(
          name as string
        );
      } else {
        customers = await this.customerService.fetchAllCustomers();
      }

      const customerResponseDTOs = customers?.map(
        (customer) => new CustomerResponseDTO(customer)
      );

      const responseMessage =
        customerResponseDTOs?.length === 0
          ? "No customers found."
          : "All customers fetched succesfully.";
      return res.success(customerResponseDTOs, responseMessage, 200);
    } catch (error) {
      next(error);
    }
  }

  async getCustomerById(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = parseInt(req.params.id);
      const customer = await this.customerService.getCustomerByPK(customerId);

      if (!customer) {
        return res.error({ message: "Customer not found." }, 400);
      }
      const customerResponseDTO = new CustomerResponseDTO(customer);
      return res.success(
        customerResponseDTO,
        "Customer fetched successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async updateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = parseInt(req.params.id);
      const customerUpdateDTO = new CustomerUpdateDTO(req.body);

      await customerUpdateDTO.validate();
      const updatedCustomer = await this.customerService.updateCustomer(
        customerId,
        customerUpdateDTO
      );

      if (!updatedCustomer) {
        return res.error({ message: "Failed to update customer." }, 400);
      }
      const customerResponseDTO = new CustomerResponseDTO(updatedCustomer);
      return res.success(customerResponseDTO, "Customer updated successfully.");
    } catch (error) {
      next(error);
    }
  }

  async deleteCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = parseInt(req.params.id);
      const customerToDelete = await this.customerService.getCustomerByPK(
        customerId
      );

      if (!customerToDelete) {
        return res.error({ message: "Customer not found." }, 404);
      }

      const deleteResult = await this.customerService.deleteCustomer(
        customerId
      );

      if( !deleteResult || deleteResult.affected === 0 ) {
        return res.error({ message: "Failed to delete customer." }, 500);
    }
    const customerResponseDTO = new CustomerResponseDTO(customerToDelete);
    return res.success(customerResponseDTO, "Customer deleted successfully.", 200);
    } catch (error) {
        next(error);
    }
  }
}

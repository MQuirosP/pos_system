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
    const customerData = new CustomerCreateDTO(req.body);
    await customerData.validate();
    const newCustomer = await this.customerService.createCustomer(
      customerData
    );
    
    try {
      return res.success(
        new CustomerResponseDTO(newCustomer),
        "Customer created successfully.",
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async getCustomers(req: Request, res: Response, next: NextFunction) {
    const { name } = req.query;
    let customers: Customer[] = [];
    if (name && typeof name === "string" && name.trim() !== "") {
      customers = await this.customerService.getCustomerByName(name);
    } else {
      customers = await this.customerService.fetchAllCustomers();
    }
    
    try {
      const customerResponseDTOs = customers.map(
        (customer) => new CustomerResponseDTO(customer)
      );
      const responseMessage =
        customerResponseDTOs.length === 0
          ? "No customers found."
          : "All customers fetched succesfully.";
      return res.success(customerResponseDTOs, responseMessage, 200);
    } catch (error) {
      next(error);
    }
  }

  async getCustomerById(req: Request, res: Response, next: NextFunction) {
    const customerId = parseInt(req.params.id);
    const customer = await this.customerService.getCustomerByPK(customerId);
    try {

      return res.success(
        new CustomerResponseDTO(customer),
        "Customer fetched successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async updateCustomer(req: Request, res: Response, next: NextFunction) {
    const customerId = parseInt(req.params.id);
    const customerUpdateDTO = new CustomerUpdateDTO(req.body);
    
    await customerUpdateDTO.validate();
    try {
      const updatedCustomer = await this.customerService.updateCustomer(
        customerId,
        customerUpdateDTO
      );

      return res.success(
        new CustomerResponseDTO(updatedCustomer),
        "Customer updated successfully."
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteCustomer(req: Request, res: Response, next: NextFunction) {
    const customerId = parseInt(req.params.id);
    try {
      const customerToDelete = await this.customerService.getCustomerByPK(
        customerId
      );
      await this.customerService.deleteCustomer(customerId);
      return res.success(
        new CustomerResponseDTO(customerToDelete),
        "Customer deleted successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }
}

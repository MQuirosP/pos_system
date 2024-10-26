import { Repository, ILike } from "typeorm";
import { handleDatabaseError } from "@middlewares/databaseErrorHandler";
import { AppError } from "@middlewares/errorHandler";
import { Customer } from "@entities/customers.entity";

export class CustomerService {
  private customerRepository: Repository<Customer>;

  constructor(customerRepository: Repository<Customer>) {
    this.customerRepository = customerRepository;
  }

  // Método auxiliar para manejar errores
  private async handleDatabaseOperation<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Método auxiliar para buscar un cliente por ID
  private async findCustomerById(customerId: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { customer_id: customerId },
    });
    if (!customer) throw new AppError("Customer not found.", 404);
    return customer;
  }

  async createCustomer(customerData: Partial<Customer>): Promise<Customer> {
    return this.handleDatabaseOperation(async () => {
      const newCustomer = this.customerRepository.create(customerData);
      return await this.customerRepository.save(newCustomer);
    });
  }

  async fetchAllCustomers(): Promise<Customer[]> {
    return this.handleDatabaseOperation(async () => {
      return await this.customerRepository.find();
    });
  }

  async getCustomerByPK(customerId: number): Promise<Customer> {
    return this.handleDatabaseOperation(() => this.findCustomerById(customerId));
  }

  async getCustomerByName(customerName: string): Promise<Customer[]> {
    return this.handleDatabaseOperation(async () => {
      const customers = await this.customerRepository.find({
        where: {
          customer_name: ILike(`%${customerName}%`),
        },
      });
      return customers;
    });
  }

  async updateCustomer(
    customerId: number,
    updates: Partial<Customer>
  ): Promise<Customer> {
    return this.handleDatabaseOperation(async () => {
      const customer = await this.findCustomerById(customerId);
      Object.assign(customer, updates);
      return await this.customerRepository.save(customer);
    });
  }

  async deleteCustomer(customerId: number): Promise<void> {
    return this.handleDatabaseOperation(async () => {
      const customer = await this.findCustomerById(customerId);
      await this.customerRepository.delete(customer.customer_id);
    });
  }
}

import dataSource from "../config/ormconfig";
import { Repository, EntityManager, DeleteResult, ILike } from "typeorm";
import { handleDatabaseError } from "../middlewares/databaseErrorHandler";
import { AppError } from "../middlewares/errorHandler";
import { Customer } from "../database/entities/customers.entity";

export class CustomerService {
  private customerRepository: Repository<Customer>;

  constructor(customerRepository: Repository<Customer>) {
    this.customerRepository = customerRepository;
  }

  async createCustomer(customerData: Customer): Promise<Customer> {
    try {
      return await dataSource.manager.transaction(
        async (transactionalEntityManager: EntityManager) => {
          const newCustomer = transactionalEntityManager.create(
            Customer,
            customerData
          );
          return await transactionalEntityManager.save(newCustomer);
        }
      );
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async fetchAllCustomers(): Promise<Customer[]> {
    try {
      return await this.customerRepository.find();
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async getCustomerByPK(customerId: number): Promise<Customer | null> {
    try {
      const customer = await this.customerRepository.findOne({
        where: { customer_id: customerId },
      });
      return customer;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async getCustomerByName(customerName: string): Promise<Customer[] | null> {
    try {
      const customer = await this.customerRepository.find({
        where: {
          customer_name: ILike(`%${customerName}%`),
        },
      });
      return customer.length > 0 ? customer : null;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async updateCustomer(
    customerId: number,
    updates: Partial<Customer>
  ): Promise<Customer | null> {
    try {
      const customer = await this.customerRepository.findOne({
        where: { customer_id: customerId },
      });

      if (!customer) {
        throw handleDatabaseError(customer);
      }

      Object.assign(customer, updates);

      return await this.customerRepository.save(customer);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async deleteCustomer(customerId: number): Promise<DeleteResult | null> {
    try {
      const customer = await this.customerRepository.findOne({
        where: { customer_id: customerId },
      });

      if (!customer) {
        throw new AppError("Customer not found.", 400);
      }
      return await this.customerRepository.delete(customerId);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }
}

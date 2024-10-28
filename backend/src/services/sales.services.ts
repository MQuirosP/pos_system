import { EntityManager, Repository } from "typeorm";
import dataSource from "@config/ormconfig";
import { handleDatabaseError } from "@middlewares/databaseErrorHandler";
import { AppError } from "@middlewares/errorHandler";
import { Sale } from "@entities/sales.entity";
import { TransactionStatus } from "@enums/custom.enums";

export class SaleService {
  private saleRepository: Repository<Sale>;

  constructor(saleRepository: Repository<Sale>) {
    this.saleRepository = saleRepository;
  }

  private async handleDatabaseOperation<T>(
    operation: () => Promise<T>
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async findSaleById(saleId: number): Promise<Sale> {
    const sale = await this.saleRepository.findOne({
      where: { sale_id: saleId },
      relations: ["sale_items"],
    });
    if (!sale) throw new AppError("Sale not found.", 404);
    return sale;
  }

  async createSale(saleData: Sale): Promise<Sale> {
    return this.handleDatabaseOperation(async () => {
      return await dataSource.manager.transaction(
        async (transactionalEntityManager: EntityManager) => {
          const newSale = transactionalEntityManager.create(Sale, saleData);
          return await transactionalEntityManager.save(newSale);
        }
      );
    });
  }

  async fetchAllSales(): Promise<Sale[]> {
    return this.handleDatabaseOperation(async () => {
      return await this.saleRepository.find({ relations: ["sale_items"] });
    });
  }

  async fetchSaleByDocNumber(docNumber: string): Promise<Sale[]> {
    return this.handleDatabaseOperation(async () => {
      const sale = await this.saleRepository.find({
        where: { doc_number: docNumber },
        relations: ["sale_items"],
      });
      if (!sale) throw new AppError("Sale not found.", 404);
      return sale;
    });
  }

  async cancelSale(docNumber: string): Promise<Sale> {
    return this.handleDatabaseOperation(async () => {
      const sale = await this.saleRepository.findOne({
        where: { doc_number: docNumber },
        relations: ["sale_items"],
      });
      if (!sale) throw new AppError("Sale not found.", 404);
      if (sale.status === TransactionStatus.Canceled) {
        throw new AppError("Sale already cancelled.", 409);
      }
      sale.status = TransactionStatus.Canceled;
      sale.sale_items.forEach((item) => (item.status = sale.status));

      await this.saleRepository.save(sale);
      return sale;
    });
  }
}

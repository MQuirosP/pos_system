import { EntityManager, Repository } from "typeorm";
import { Sale } from "@entities/sales.entity";
import { handleDatabaseError } from "@middlewares/databaseErrorHandler";
import { AppError } from "@middlewares/errorHandler";
import dataSource from "@config/ormconfig";
import { SaleStatus } from "@enums/custom.enums";

export class SaleService {
  private saleRepository: Repository<Sale>;

  constructor(saleRepository: Repository<Sale>) {
    this.saleRepository = saleRepository;
  }

  async createSale(saleData: Sale): Promise<Sale> {
    try {
      return await dataSource.manager.transaction(
        async (transactionalEntityManager: EntityManager) => {
          const newSale = transactionalEntityManager.create(Sale, saleData);
          return await transactionalEntityManager.save(newSale);
        }
      );
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async fetchSales(): Promise<Sale[]> {
    try {
      return await this.saleRepository.find({ relations: ["sale_items"] });
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async fetchSaleByDocNumber(docNumber: string): Promise<Sale> {
    try {
      const sale = await this.saleRepository.findOne({
        where: { doc_number: docNumber },
        relations: ["sale_items"],
      });
      if (!sale) throw new AppError("No sale found.", 404);
      return sale;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async cancelSale(docNumber: string): Promise<Sale> {
    try {
      const sale = await this.saleRepository.findOne({
        where: { doc_number: docNumber },
        relations: ["sale_items"],
      });
      if (!sale) throw new AppError("Sale not found.", 404);
      if (sale.status === SaleStatus.Canceled) {
        throw new AppError("Sale already cancelled.", 409);
      }
      sale.status = SaleStatus.Canceled;
      sale.sale_items.forEach((item) => (item.status = sale.status));

      await this.saleRepository.save(sale);
      return sale;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }
}

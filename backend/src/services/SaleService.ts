import { Repository } from "typeorm";
import { Sale } from "../database/entities/sales.entity";
import { ISales } from "../interfaces/sales.interface";
import { handleDatabaseError } from "../middlewares/databaseErrorHandler";
import { AppError } from "../middlewares/errorHandler";

export class SaleService {
  private saleRepository: Repository<Sale>;

  constructor(saleRepository: Repository<Sale>) {
    this.saleRepository = saleRepository;
  }

  async createSale(saleData: ISales): Promise<ISales | null> {
    try {
      const newSale = this.saleRepository.create(saleData);
      return await this.saleRepository.save(newSale);
      
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  async fetchSales(): Promise<ISales[]> {
    try {
      return await this.saleRepository.find({ relations: ["sale_items"] });
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  async fetchSaleByDocNumber(docNumber: string): Promise<ISales | null> {
    try {
      const sale = await this.saleRepository.findOne({
        where: { doc_number: docNumber },
        relations: ["sale_items"],
      });
      return sale;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async cancelSale(docNumber: string): Promise<ISales | null> {
    try {
      const sale = await this.saleRepository.findOne({
        where: { doc_number: docNumber },
        relations: ['sale_items'],
      });
      if(!sale) {
        throw new AppError("Sale not found.", 404)
      }
      if(sale.status === "canceled") {
        throw new AppError("Sale already canceled", 409)
      }
      sale.status = "canceled"
      for (const product of sale.sale_items) {
        product.status = "canceled"
        // await this.saleRepository.save(product);
      }
      await this.saleRepository.save(sale);
      return sale;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }
}

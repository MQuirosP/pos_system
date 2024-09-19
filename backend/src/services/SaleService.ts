import { Repository } from "typeorm";
import { Sale } from "../entities/sales.entity";
import { ISales } from "../interfaces/sales.interface";
import { handleDatabaseError } from "../middlewares/databaseErrorHandler";

export class SaleService {
  private saleRepository: Repository<Sale>;

  constructor(saleRepository: Repository<Sale>) {
    this.saleRepository = saleRepository;
  }

  async createSale(saleData: ISales): Promise<ISales | null> {
    const newSale = this.saleRepository.create(saleData);
    return await this.saleRepository.save(newSale);
  }

  async fetchSales(): Promise<ISales[]> {
    try {
      return await this.saleRepository.find({ relations: ["products"] });
    } catch (error) {
      throw handleDatabaseError(error)
    }
  }

  async fetchSaleByDocNumber(docNumber: string): Promise<ISales | null> {
    try {
      const sale = await this.saleRepository.findOne({
        where: { doc_number: docNumber },
        relations: ["products"],
      });
      return sale;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }
}

import { Repository } from "typeorm";
import { Sale } from "../entities/sales.entity";
import { ISales } from "../interfaces/sales.interface";

export class SaleService {
    private saleRepository: Repository<Sale>;

    constructor(saleRepository: Repository<Sale>) {
        this.saleRepository = saleRepository;
    }

    async createSale(saleData: ISales): Promise<Sale | null> {
        const newSale = this.saleRepository.create(saleData);
        return await this.saleRepository.save(newSale)
    }
}
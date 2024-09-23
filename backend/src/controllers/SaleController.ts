import { SaleCreateDTO, SaleResponseDto } from "./../dtos/sales.dto";
import { Request, Response, NextFunction } from "express";
import dataSource from "../config/ormconfig";
import { Sale } from "../entities/sales.entity";
import { SaleService } from "./../services/SaleService";

export class SaleController {
  private readonly saleService: SaleService;

  constructor() {
    const saleRepository = dataSource.getRepository(Sale);
    this.saleService = new SaleService(saleRepository);
  }

  async createSale(req: Request, res: Response, next: NextFunction) {
    try {
      const saleData = new SaleCreateDTO(req.body);
      await saleData.validate();
      const newSale = await this.saleService.createSale(
        saleData as unknown as Sale
      );

      if (!newSale) {
        return res.error("No sale created.", 400);
      }

      const saleResponseDTO = new SaleResponseDto(newSale);
      return res.success(saleResponseDTO, "Sale created successfully.", 201);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async fetchAllSales(req: Request, res: Response, next: NextFunction) {
    try {
        const sales = await this.saleService.fetchSales();
        
        if (sales.length === 0) {
            return res.success(sales, "No sales found.", 200);
        }

        const saleResponseDTO = sales.map(sale => new SaleResponseDto(sale));
        return res.success(saleResponseDTO, "Sales fetched successfully.", 200);
    } catch (error) {
        next(error);
    }
}

  async fetchSaleByDocNumber(req: Request, res: Response, next: NextFunction) {
    try {
      const docNumber = req.params.doc_number.toString();
      const sale = await this.saleService.fetchSaleByDocNumber(docNumber);
      if (!sale) {
        return res.error({ message: "Sale not found." }, 404);
      }
      const saleResponseDto = new SaleResponseDto(sale)
      return res.success(saleResponseDto, "Sale fetched successfully.", 200);
    } catch (error) {
      next(error);
    }
  }
}

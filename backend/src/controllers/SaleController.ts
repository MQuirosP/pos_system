import { SaleCreateDTO, SaleResponseDto } from "./../dtos/sales.dto";
import { Request, Response, NextFunction } from "express";
import dataSource from "../config/ormconfig";
import { Sale } from "../database/entities/sales.entity";
import { SaleService } from "./../services/SaleService";

export class SaleController {
  private readonly saleService: SaleService;

  constructor() {
    const saleRepository = dataSource.getRepository(Sale);
    this.saleService = new SaleService(saleRepository);
  }

  async createSale(req: Request, res: Response, next: NextFunction) {
    const saleData = new SaleCreateDTO(req.body);
    await saleData.validate();
    try {
      const newSale = await this.saleService.createSale(saleData);

      return res.success(
        new SaleResponseDto(newSale),
        "Sale created successfully.",
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async fetchAllSales(req: Request, res: Response, next: NextFunction) {
    try {
      const sales = await this.saleService.fetchSales();

      const saleResponseDTO = sales.map((sale) => new SaleResponseDto(sale));
      return res.success(saleResponseDTO, "Sales fetched successfully.", 200);
    } catch (error) {
      next(error);
    }
  }

  async fetchSaleByDocNumber(req: Request, res: Response, next: NextFunction) {
    const docNumber = req.params.doc_number.toString();
    try {
      const sale = await this.saleService.fetchSaleByDocNumber(docNumber);
      return res.success(
        new SaleResponseDto(sale),
        "Sale fetched successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async cancelSale(req: Request, res: Response, next: NextFunction) {
    const docNumber = req.params.doc_number.toString();
    try {
      const sale = await this.saleService.cancelSale(docNumber);
      return res.success(
        new SaleResponseDto(sale),
        "Sale canceled successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }
}

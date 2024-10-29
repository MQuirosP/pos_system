import { SaleCreateDTO, SaleResponseDto } from "@dtos/sales.dto";
import { Request, Response, NextFunction } from "express";
import dataSource from "@config/ormconfig";
import { Sale } from "@entities/sales.entity";
import { SaleService } from "@services/sales.services";

export class SaleController {
  private readonly saleService: SaleService;

  constructor() {
    const saleRepository = dataSource.getRepository(Sale);
    this.saleService = new SaleService(saleRepository);
  }

  async handleControllerOperation(
    req: Request,
    res: Response,
    next: NextFunction,
    operation: () => Promise<any>
  ) {
    try {
      await operation();
    } catch (error) {
      next(error);
    }
  }

  async createSale(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const saleData = new SaleCreateDTO(req.body);
      await saleData.validate();
      const newSale = await this.saleService.createSale(saleData);

      return res.success(
        new SaleResponseDto(newSale),
        "Sale created successfully.",
        201
      );
    });
  }

  async fetchAllSales(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const { doc_number } = req.query;
      let sales: Sale[] = [];

      if (
        doc_number &&
        typeof doc_number === "string" &&
        doc_number.trim() !== ""
      ) {
        sales = await this.saleService.fetchSaleByDocNumber(doc_number);
      } else {
        sales = await this.saleService.fetchAllSales();
      }

      const saleResponseDTOs = sales.map((sale) => new SaleResponseDto(sale));
      const responseMessage =
        saleResponseDTOs.length === 0
          ? "No sales found."
          : "All sales fetched fuccessfuly";

      return res.success(saleResponseDTOs, responseMessage, 200);
    });
  }

  async getSaleById(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const saleId = parseInt(req.params.id);
      const sale = await this.saleService.fetchSaleByPK(saleId);
      return res.success(
        new SaleResponseDto(sale),
        "Sale fetched successfully.",
        200
      );
    });
  }

  async cancelSale(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const docNumber = req.params.doc_number;
      const sale = await this.saleService.cancelSale(docNumber);
      return res.success(
        new SaleResponseDto(sale),
        "Sale canceled successfully.",
        200
      );
    });
  }
}

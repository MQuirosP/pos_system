import { PurchaseCreateDTO, PurchaseResponseDTO } from "@dtos/purchases.dto";
import { Request, Response, NextFunction } from "express";
import dataSource from "@config/ormconfig";
import { Purchase } from "@entities/purchases.entity";
import { PurchaseService } from "@services/purchases.services";

export class PurchaseController {
  private readonly purchaseService: PurchaseService;

  constructor() {
    const purchaseRepository = dataSource.getRepository(Purchase);
    this.purchaseService = new PurchaseService(purchaseRepository);
  }

  async createPurchase(req: Request, res: Response, next: NextFunction) {
    const purchaseData = new PurchaseCreateDTO(req.body);
    await purchaseData.validate();
    try {
      const newPurchase = await this.purchaseService.createPurchase(
        purchaseData
      );

      return res.success(
        new PurchaseResponseDTO(newPurchase),
        "Purchase created successfully.",
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async fetchAllPurchases(req: Request, res: Response, next: NextFunction) {
    try {
      const purchases = await this.purchaseService.fetchPurchases();

      const purchaseResponseDTO = purchases.map(
        (purchase) => new PurchaseResponseDTO(purchase)
      );
      return res.success(
        purchaseResponseDTO,
        "Purchases fetched successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async fetchPurchaseByDocNumber(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const docNumber = req.params.docNumber;
    try {
      const purchase = await this.purchaseService.fetchPurchaseByDocNumber(
        docNumber
      );
      return res.success(
        new PurchaseResponseDTO(purchase),
        "Purchase fetched successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async cancelPurchase(req: Request, res: Response, next: NextFunction) {
    const docNumber = req.params.doc_number;
    try {
      const purchase = await this.purchaseService.cancelPurchase(docNumber);
      return res.success(
        new PurchaseResponseDTO(purchase),
        "Purchase canceled successfully.",
        200
      );
    } catch (error) {
      next(error);
    }
  }
}

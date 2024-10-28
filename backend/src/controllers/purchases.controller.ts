import { PurchaseCreateDTO, PurchaseResponseDTO } from "@dtos/purchases.dto";
import { Request, Response, NextFunction } from "express";
import dataSource from "@config/ormconfig";
import { Purchase } from "@entities/purchases.entity";
import { PurchaseService } from "@services/purchases.services";
import logger from "@utils/logger";

export class PurchaseController {
  private readonly purchaseService: PurchaseService;

  constructor() {
    const purchaseRepository = dataSource.getRepository(Purchase);
    this.purchaseService = new PurchaseService(purchaseRepository);
  }

  private async handleControllerOperation(
    req: Request,
    res: Response,
    next: NextFunction,
    operation: () => Promise<any>
  ) {
    try {
      const startTime = Date.now();
      await operation();
      const duration = Date.now() - startTime;
      logger.info({
        message: `Request processed`,
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        clientIp: req.ip,
        // userId: req.user?.id || "Anonymous",
      });
    } catch (error) {
      next(error);
    }
  }

  async createPurchase(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const purchaseData = new PurchaseCreateDTO(req.body);
      await purchaseData.validate();
      const newPurchase = await this.purchaseService.createPurchase(
        purchaseData
      );

      return res.success(
        new PurchaseResponseDTO(newPurchase),
        "Purchase created successfully.",
        201
      );
    });
  }

  async getPurchases(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const { doc_number } = req.query;
      let purchases: Purchase[] = [];

      if (
        doc_number &&
        typeof doc_number === "string" &&
        doc_number.trim() !== ""
      ) {
        purchases = await this.purchaseService.fetchPurchaseByDocNumber(
          doc_number
        );
      } else {
        purchases = await this.purchaseService.fetchAllPurchases();
      }

      const purchaseResponseDTOs = purchases.map(
        (purchase) => new PurchaseResponseDTO(purchase)
      );
      const responseMessage =
        purchaseResponseDTOs.length === 0
          ? "No purchases found."
          : "All purchases fetched successfully.";

      return res.success(purchaseResponseDTOs, responseMessage, 200);
    });
  }

  async getPurchaseById(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const purchaseId = parseInt(req.params.id);
      const purchase = await this.purchaseService.findPurchaseById(purchaseId);
      return res.success(
        new PurchaseResponseDTO(purchase),
        "Purchase fetched successfully.",
        200
      );
    });
  }

  async cancelPurchase(req: Request, res: Response, next: NextFunction) {
    this.handleControllerOperation(req, res, next, async () => {
      const docNumber = req.params.doc_number;
      const purchase = await this.purchaseService.cancelPurchase(docNumber);
      return res.success(
        new PurchaseResponseDTO(purchase),
        "Purchase canceled successfully.",
        200
      );
    });
  }
}

import { EntityManager, Repository } from "typeorm";
import dataSource from "@config/ormconfig";
import { handleDatabaseError } from "@middlewares/databaseErrorHandler";
import { AppError } from "@middlewares/errorHandler";
import { Purchase } from "@entities/purchases.entity";
import { TransactionStatus } from "@enums/custom.enums";

export class PurchaseService {
  private purchaseRepository: Repository<Purchase>;

  constructor(purchaseRepository: Repository<Purchase>) {
    this.purchaseRepository = purchaseRepository;
  }

  async createPurchase(purchaseData: Purchase): Promise<Purchase> {
    try {
      return await dataSource.manager.transaction(
        async (transactionalEntityManager: EntityManager) => {
          const newPurchase = transactionalEntityManager.create(
            Purchase,
            purchaseData
          );
          return await transactionalEntityManager.save(newPurchase);
        }
      );
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async fetchPurchases(): Promise<Purchase[]> {
    try {
      return await this.purchaseRepository.find({
        relations: ["purchase_items"],
      });
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async fetchPurchaseByDocNumber(docNumber: string): Promise<Purchase> {
    try {
      const purchase = await this.purchaseRepository.findOne({
        where: { doc_number: docNumber },
        relations: ["purchase_items"],
      });
      if (!purchase) throw new AppError("Purchase not found.", 404);
      return purchase;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async cancelPurchase(docNumber: string): Promise<Purchase> {
    try {
      const purchase = await this.purchaseRepository.findOne({
        where: { doc_number: docNumber },
        relations: ["purchase_items"],
      });
      if (!purchase) throw new AppError("Purchase not found.", 404);
      if (purchase.status === TransactionStatus.Canceled) {
        throw new AppError("Purchase already cancelled.", 409);
      }
      purchase.status = TransactionStatus.Canceled;
      purchase.purchase_items.forEach(
        (item) => (item.status = purchase.status)
      );

      await this.purchaseRepository.save(purchase);
      return purchase;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }
}

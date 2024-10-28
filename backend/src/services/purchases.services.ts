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

  private async handleDatabaseOperation<T>(
    operation: () => Promise<T>
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  private async findPurchaseById(purchaseId: number): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOne({
      where: { purchase_id: purchaseId },
      relations: ["purchase_items"],
    });
    if (!purchase) throw new AppError("Purchase not found.", 404);
    return purchase;
  }

  async createPurchase(purchaseData: Purchase): Promise<Purchase> {
    return this.handleDatabaseOperation(async () => {
      return await dataSource.manager.transaction(
        async (transactionalEntityManager: EntityManager) => {
          const newPurchase = transactionalEntityManager.create(
            Purchase,
            purchaseData
          );
          return await transactionalEntityManager.save(newPurchase);
        }
      );
    });
  }

  async fetchAllPurchases(): Promise<Purchase[]> {
    return this.handleDatabaseOperation(async () => {
      return await this.purchaseRepository.find({
        relations: ["purchase_items"]
      });
    });
  }

  async fetchPurchaseByDocNumber(docNumber: string): Promise<Purchase[]> {
    return this.handleDatabaseOperation(async () => {
      const purchase = await this.purchaseRepository.find({
        where: { doc_number: docNumber },
        relations: ["purchase_items"],
      });
      if (!purchase) throw new AppError("Purchase not found.", 404);
      return purchase;
    });
  }

  async cancelPurchase(docNumber: string): Promise<Purchase> {
    return this.handleDatabaseOperation(async () => {
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
    });
  }
}

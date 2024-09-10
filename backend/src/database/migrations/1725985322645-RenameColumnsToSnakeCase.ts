import { query } from "express";
import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameColumnsToSnakeCase1725985322645
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("audit_documents", "auditId", "audit_id");
    await queryRunner.renameColumn(
      "audit_documents",
      "createdAt",
      "created_at"
    );
    await queryRunner.renameColumn(
      "audit_documents",
      "updatedAt",
      "updated_at"
    );

    // Renombrar columnas en `audit_items`
    await queryRunner.renameColumn("audit_items", "createdAt", "created_at");
    await queryRunner.renameColumn("audit_items", "updatedAt", "updated_at");

    // Renombrar columnas en `blacklisted_tokens`
    await queryRunner.renameColumn(
      "blacklisted_tokens",
      "expiresAt",
      "expires_at"
    );
    await queryRunner.renameColumn(
      "blacklisted_tokens",
      "createdAt",
      "created_at"
    );
    await queryRunner.renameColumn(
      "blacklisted_tokens",
      "updatedAt",
      "updated_at"
    );

    // Renombrar columnas en `customers`
    await queryRunner.renameColumn("customers", "createdAt", "created_at");
    await queryRunner.renameColumn("customers", "updatedAt", "updated_at");

    // Renombrar columnas en `options`
    await queryRunner.renameColumn(
      "options",
      "activateRegister",
      "activate_register"
    );
    await queryRunner.renameColumn("options", "createdAt", "created_at");
    await queryRunner.renameColumn("options", "updatedAt", "updated_at");

    // Renombrar columnas en `products`
    await queryRunner.renameColumn("products", "productId", "product_id");
    await queryRunner.renameColumn(
      "products",
      "taxPercentage",
      "tax_percentage"
    );
    await queryRunner.renameColumn("products", "createdAt", "created_at");
    await queryRunner.renameColumn("products", "updatedAt", "updated_at");

    // Renombrar columnas en `providers`
    await queryRunner.renameColumn("providers", "createdAt", "created_at");
    await queryRunner.renameColumn("providers", "updatedAt", "updated_at");

    // Renombrar columnas en `purchase_items`
    await queryRunner.renameColumn(
      "purchase_items",
      "purchaseId",
      "purchase_id"
    );
    await queryRunner.renameColumn("purchase_items", "createdAt", "created_at");
    await queryRunner.renameColumn("purchase_items", "updatedAt", "updated_at");

    // Renombrar columnas en `purchases`
    await queryRunner.renameColumn("purchases", "providerId", "provider_id");
    await queryRunner.renameColumn(
      "purchases",
      "paymentMethod",
      "payment_method"
    );
    await queryRunner.renameColumn("purchases", "createdAt", "created_at");
    await queryRunner.renameColumn("purchases", "updatedAt", "updated_at");

    // Renombrar columnas en `sale_items`
    await queryRunner.renameColumn("sale_items", "saleId", "sale_id");
    await queryRunner.renameColumn("sale_items", "createdAt", "created_at");
    await queryRunner.renameColumn("sale_items", "updatedAt", "updated_at");

    // Renombrar columnas en `sales`
    await queryRunner.renameColumn("sales", "customerId", "customer_id");
    await queryRunner.renameColumn("sales", "paymentMethod", "payment_method");
    await queryRunner.renameColumn("sales", "createdAt", "created_at");
    await queryRunner.renameColumn("sales", "updatedAt", "updated_at");

    // Renombrar columnas en `users`
    await queryRunner.renameColumn("users", "userId", "user_id");
    await queryRunner.renameColumn("users", "createdAt", "created_at");
    await queryRunner.renameColumn("users", "updatedAt", "updated_at");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("audit_documents", "audit_id", "auditId");
    await queryRunner.renameColumn(
      "audit_documents",
      "created_at",
      "createdAt"
    );
    await queryRunner.renameColumn(
      "audit_documents",
      "updated_at",
      "updatedAt"
    );

    await queryRunner.renameColumn("audit_items", "created_at", "createdAt");
    await queryRunner.renameColumn("audit_items", "updated_at", "updatedAt");

    await queryRunner.renameColumn(
      "blacklisted_tokens",
      "expires_at",
      "expiresAt"
    );
    await queryRunner.renameColumn(
      "blacklisted_tokens",
      "created_at",
      "createdAt"
    );
    await queryRunner.renameColumn(
      "blacklisted_tokens",
      "updated_at",
      "updatedAt"
    );

    await queryRunner.renameColumn("customers", "created_at", "createdAt");
    await queryRunner.renameColumn("customers", "updated_at", "updatedAt");

    await queryRunner.renameColumn(
      "options",
      "activate_register",
      "activateRegister"
    );
    await queryRunner.renameColumn("options", "created_at", "createdAt");
    await queryRunner.renameColumn("options", "updated_at", "updatedAt");

    await queryRunner.renameColumn("products", "product_id", "productId");
    await queryRunner.renameColumn(
      "products",
      "tax_percentage",
      "taxPercentage"
    );
    await queryRunner.renameColumn("products", "created_at", "createdAt");
    await queryRunner.renameColumn("products", "updated_at", "updatedAt");

    await queryRunner.renameColumn("providers", "created_at", "createdAt");
    await queryRunner.renameColumn("providers", "updated_at", "updatedAt");

    await queryRunner.renameColumn(
      "purchase_items",
      "purchase_id",
      "purchaseId"
    );
    await queryRunner.renameColumn("purchase_items", "created_at", "createdAt");
    await queryRunner.renameColumn("purchase_items", "updated_at", "updatedAt");

    await queryRunner.renameColumn("purchases", "provider_id", "providerId");
    await queryRunner.renameColumn(
      "purchases",
      "payment_method",
      "paymentMethod"
    );
    await queryRunner.renameColumn("purchases", "created_at", "createdAt");
    await queryRunner.renameColumn("purchases", "updated_at", "updatedAt");

    await queryRunner.renameColumn("sale_items", "sale_id", "saleId");
    await queryRunner.renameColumn("sale_items", "created_at", "createdAt");
    await queryRunner.renameColumn("sale_items", "updated_at", "updatedAt");

    await queryRunner.renameColumn("sales", "customer_id", "customerId");
    await queryRunner.renameColumn("sales", "payment_method", "paymentMethod");
    await queryRunner.renameColumn("sales", "created_at", "createdAt");
    await queryRunner.renameColumn("sales", "updated_at", "updatedAt");

    await queryRunner.renameColumn("users", "user_id", "userId");
    await queryRunner.renameColumn("users", "created_at", "createdAt");
    await queryRunner.renameColumn("users", "updated_at", "updatedAt");
  }
}

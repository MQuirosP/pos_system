import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTables1725982467189 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('AuditDocuments', 'audit_documents');
        await queryRunner.renameTable('AuditItems', 'audit_items');
        await queryRunner.renameTable('BlacklistedTokens', 'blacklisted_tokens');
        await queryRunner.renameTable('Options', 'options');
        await queryRunner.renameTable('Providers', 'providers');
        await queryRunner.renameTable('Purchases', 'purchases');
        await queryRunner.renameTable('PurchaseItems', 'purchase_items');
        await queryRunner.renameTable('Products', 'products');
        await queryRunner.renameTable('Customers', 'customers');
        await queryRunner.renameTable('Sales', 'sales');
        await queryRunner.renameTable('SaleItems', 'sale_items');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('audit_documents', 'AuditDocuments');
        await queryRunner.renameTable('audit_items', 'AuditItems');
        await queryRunner.renameTable('blacklisted_tokens', 'BlacklistedTokens');
        await queryRunner.renameTable('options', 'Options');
        await queryRunner.renameTable('providers', 'Providers');
        await queryRunner.renameTable('purchases', 'Purchases');
        await queryRunner.renameTable('purchase_items', 'PurchaseItems');
        await queryRunner.renameTable('products', 'Products');
        await queryRunner.renameTable('customers', 'Customers');
        await queryRunner.renameTable('sales', 'Sales');
        await queryRunner.renameTable('sale_items', 'SaleItems');
    }

}

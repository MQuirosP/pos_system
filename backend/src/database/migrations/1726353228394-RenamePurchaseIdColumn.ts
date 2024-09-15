import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamePurchaseIdColumn1726353228394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn(
            "purchases",
            "purchaseId",
            "purchase_id"
        )
        await queryRunner.renameColumn(
            "sales",
            "saleId",
            "sale_id"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn(
            "purchases",
            "purchase_id",
            "purchaseId"
        )
        await queryRunner.renameColumn(
            "sales",
            "sale_id",
            "saleId"
        )
    }

}

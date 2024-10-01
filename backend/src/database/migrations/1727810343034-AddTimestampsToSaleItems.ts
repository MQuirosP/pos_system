import { type } from "os";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTimestampsToSaleItems1727810343034 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("sale_items", new TableColumn({
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP", // Corrección aquí
        }));

        await queryRunner.addColumn("sale_items", new TableColumn({
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP", // Corrección aquí
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("sale_items", "created_at");
        await queryRunner.dropColumn("sale_items", "updated_at");
    }
}


import { type } from "os";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSaleIdToSaleItems1727810126423 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("sale_items", new TableColumn({
    name: "sale_id",
    type: "int",
    isNullable: true, // o false, dependiendo de si quieres que sea obligatoria
}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("sale_items", "sale_id");

    }

}

import { type } from "os";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSaleItemIdToSaleItems1727817902929 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.addColumn('sale_items', new TableColumn({
            name: 'sale_item_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true, // Autoincrementable
            generationStrategy: 'increment', // Estrategia de generación
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

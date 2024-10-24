import { type } from "os";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductTable1727813595068 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "product_id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "int_code",
            type: "varchar",
            isUnique: true,
            isNullable: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "purchase_price",
            type: "decimal",
            precision: 10,
            scale: 5,
            isNullable: true,
          },
          {
            name: "quantity",
            type: "decimal",
            precision: 10,
            scale: 5,
            isNullable: true,
          },
          {
            name: "sale_price",
            type: "decimal",
            precision: 10,
            scale: 5,
            isNullable: true,
          },
          {
            name: "is_taxed",
            type: "boolean",
            isNullable: true,
          },
          {
            name: "margin",
            type: "decimal",
            precision: 10,
            scale: 5,
            isNullable: true,
          },
          {
            name: "tax_percentage",
            type: "decimal",
            precision: 10,
            scale: 5,
            isNullable: true,
          },
          {
            name: "category_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "category_name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products", true);
    }

}

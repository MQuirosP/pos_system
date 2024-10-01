import { type } from "os";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePurchaseItems1727813938274 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
      new Table({
        name: "purchase_items",
        columns: [
          {
            name: "sequence",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "purchase_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "int_code",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "purchase_price",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: "quantity",
            type: "float",
            isNullable: false,
          },
          {
            name: "sub_total",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: "taxes_amount",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: false,
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
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "total",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: "status",
            type: "varchar",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["purchase_id"],
            referencedTableName: "purchases",
            referencedColumnNames: ["purchase_id"],
            onDelete: "SET NULL",
          },
          {
            columnNames: ["int_code"],
            referencedTableName: "products",
            referencedColumnNames: ["int_code"],
            onDelete: "SET NULL",
          },
        ],
      })
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("purchase_items");
    }

}

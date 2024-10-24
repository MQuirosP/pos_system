import { type } from "os";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSaleItemsTable1727814140543 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
      new Table({
        name: "sale_items",
        columns: [
          {
            name: "sequence",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "status",
            type: "varchar",
            isNullable: false,
            default: "'completed'",
          },
          {
            name: "sale_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "int_code",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "sale_price",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: "quantity",
            type: "float",
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
          {
            name: "name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "sub_total",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: "taxes_amount",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: "total",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: true,
          },
        ],
      })
    );

    // Crear las claves foráneas
    await queryRunner.createForeignKey(
      "sale_items",
      new TableForeignKey({
        columnNames: ["sale_id"],
        referencedTableName: "sales",
        referencedColumnNames: ["sale_id"],
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "sale_items",
      new TableForeignKey({
        columnNames: ["int_code"],
        referencedTableName: "products",
        referencedColumnNames: ["int_code"],
        onDelete: "SET NULL",
      })
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const saleItemsTable = await queryRunner.getTable("sale_items");
    
        const saleForeignKey = saleItemsTable!.foreignKeys.find(fk => fk.columnNames.indexOf("sale_id") !== -1);
        if (saleForeignKey) {
          await queryRunner.dropForeignKey("sale_items", saleForeignKey);
        }
    
        const productForeignKey = saleItemsTable!.foreignKeys.find(fk => fk.columnNames.indexOf("int_code") !== -1);
        if (productForeignKey) {
          await queryRunner.dropForeignKey("sale_items", productForeignKey);
        }
    
        // Eliminar la tabla de items de venta
        await queryRunner.dropTable("sale_items");
    }

}

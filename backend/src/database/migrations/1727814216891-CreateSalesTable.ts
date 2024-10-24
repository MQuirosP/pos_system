import { type } from "os";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSalesTable1727814216891 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
      new Table({
        name: "sales",
        columns: [
          {
            name: "sale_id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "customer_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "customer_name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "payment_method",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "doc_number",
            type: "varchar",
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
            name: "status",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "observations",
            type: "text",
            isNullable: true,
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
            name: "total",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: false,
          },
        ],
      })
    );

    // Crear la clave foránea para la relación con Customer
    await queryRunner.createForeignKey(
      "sales",
      new TableForeignKey({
        columnNames: ["customer_id"],
        referencedTableName: "customers",
        referencedColumnNames: ["customer_id"],
        onDelete: "SET NULL",
      })
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         // Eliminar la clave foránea
    const salesTable = await queryRunner.getTable("sales");
    const customerForeignKey = salesTable!.foreignKeys.find(fk => fk.columnNames.indexOf("customer_id") !== -1);
    if (customerForeignKey) {
      await queryRunner.dropForeignKey("sales", customerForeignKey);
    }

    // Eliminar la tabla de ventas
    await queryRunner.dropTable("sales");
    }

}

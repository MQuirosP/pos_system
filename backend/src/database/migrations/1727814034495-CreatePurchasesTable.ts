import { type } from "os";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePurchasesTable1727814034495 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
      new Table({
        name: "purchases",
        columns: [
          {
            name: "purchase_id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "provider_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "provider_name",
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
            name: "status",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "observations",
            type: "text",
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
      })
    );

    // Crear las claves foráneas
    await queryRunner.createForeignKey(
      "purchases",
      new TableForeignKey({
        columnNames: ["provider_id"],
        referencedTableName: "providers",
        referencedColumnNames: ["provider_id"],
        onDelete: "SET NULL",
      })
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("purchases");
    const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("provider_id") !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey("purchases", foreignKey);
    }

    // Eliminar la tabla de compras
    await queryRunner.dropTable("purchases");
    }

}

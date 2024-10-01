import { type } from "os";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnsToSaleItems1727808892183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Agregar columnas faltantes
    await queryRunner.addColumns("sale_items", [
      new TableColumn({
        name: "int_code",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "sale_price",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: "quantity",
        type: "float",
        isNullable: true,
      }),
      new TableColumn({
        name: "name",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "sub_total",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: "taxes_amount",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: "total",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar las columnas en caso de revertir la migración
    await queryRunner.dropColumns("sale_items", [
      "int_code",
      "sale_price",
      "quantity",
      "name",
      "sub_total",
      "taxes_amount",
      "total",
    ]);
  }
}


import { query } from "express";
import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDocNumberToUnique1727901715618 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Agregar la restricción UNIQUE a la columna doc_number en la tabla sales
    await queryRunner.query(`
      ALTER TABLE "sales"
      ADD CONSTRAINT "UQ_sales_doc_number" UNIQUE ("doc_number");
    `);

    // Agregar la restricción UNIQUE a la columna doc_number en la tabla purchases
    await queryRunner.query(`
      ALTER TABLE "purchases"
      ADD CONSTRAINT "UQ_purchases_doc_number" UNIQUE ("doc_number");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar la restricción UNIQUE de la columna doc_number en la tabla sales
    await queryRunner.query(`
      ALTER TABLE "sales"
      DROP CONSTRAINT "UQ_sales_doc_number";
    `);

    // Eliminar la restricción UNIQUE de la columna doc_number en la tabla purchases
    await queryRunner.query(`
      ALTER TABLE "purchases"
      DROP CONSTRAINT "UQ_purchases_doc_number";
    `);
  }
}


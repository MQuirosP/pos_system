import { query } from "express";
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotNullConstraints1727911171819 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Agregar restricciones NOT NULL en la tabla sale_items
        await queryRunner.query(`
            ALTER TABLE sale_items
            ALTER COLUMN int_code SET NOT NULL,
            ALTER COLUMN quantity SET NOT NULL,
            ALTER COLUMN sub_total SET NOT NULL,
            ALTER COLUMN taxes_amount SET NOT NULL,
            ALTER COLUMN name SET NOT NULL,
            ALTER COLUMN total SET NOT NULL,
            ALTER COLUMN status SET NOT NULL
        `);

        // Agregar restricciones NOT NULL en la tabla purchase_items
        await queryRunner.query(`
            ALTER TABLE purchase_items
            ALTER COLUMN int_code SET NOT NULL,
            ALTER COLUMN quantity SET NOT NULL,
            ALTER COLUMN sub_total SET NOT NULL,
            ALTER COLUMN taxes_amount SET NOT NULL,
            ALTER COLUMN name SET NOT NULL,
            ALTER COLUMN total SET NOT NULL,
            ALTER COLUMN status SET NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         // Quitar restricciones NOT NULL en la tabla sale_items
         await queryRunner.query(`
            ALTER TABLE sale_items
            ALTER COLUMN int_code DROP NOT NULL,
            ALTER COLUMN quantity DROP NOT NULL,
            ALTER COLUMN sub_total DROP NOT NULL,
            ALTER COLUMN taxes_amount DROP NOT NULL,
            ALTER COLUMN name DROP NOT NULL,
            ALTER COLUMN total DROP NOT NULL,
            ALTER COLUMN status DROP NOT NULL
        `);

        // Quitar restricciones NOT NULL en la tabla purchase_items
        await queryRunner.query(`
            ALTER TABLE purchase_items
            ALTER COLUMN int_code DROP NOT NULL,
            ALTER COLUMN quantity DROP NOT NULL,
            ALTER COLUMN sub_total DROP NOT NULL,
            ALTER COLUMN taxes_amount DROP NOT NULL,
            ALTER COLUMN name DROP NOT NULL,
            ALTER COLUMN total DROP NOT NULL,
            ALTER COLUMN status DROP NOT NULL
        `);
    }

}

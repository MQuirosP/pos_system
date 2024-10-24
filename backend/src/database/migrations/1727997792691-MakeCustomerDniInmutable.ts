import { query } from "express";
import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeCustomerDniInmutable1727997792691
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE OR REPLACE FUNCTION prevent_customer_dni_update()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.customer_dni IS DISTINCT FROM OLD.customer_dni THEN
          RAISE EXCEPTION 'Cannot update customer_dni field, it is immutable.';
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
            `);
    await queryRunner.query(`
         CREATE TRIGGER trigger_prevent_customer_dni_update
      BEFORE UPDATE ON customers
      FOR EACH ROW
      EXECUTE FUNCTION prevent_customer_dni_update();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS trigger_prevent_customer_dni_update ON customers;`
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS prevent_customer_dni_update;`
    );
  }
}

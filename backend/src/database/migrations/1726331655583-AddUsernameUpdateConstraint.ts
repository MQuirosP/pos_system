import { query } from "express";
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsernameUpdateConstraint1726331655583 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      CREATE OR REPLACE FUNCTION prevent_username_update() 
      RETURNS TRIGGER AS $$
      BEGIN
        IF OLD.username <> NEW.username THEN
          RAISE EXCEPTION 'El nombre de usuario no se puede modificar';
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER prevent_username_update_trigger
      BEFORE UPDATE ON "users"
      FOR EACH ROW
      EXECUTE FUNCTION prevent_username_update();
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS prevent_username_update_trigger ON "users";
            DROP FUNCTION IF EXISTS prevent_username_update;
          `);
    }

}

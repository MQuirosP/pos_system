import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateIsActiveColumn1727729586754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE users ALTER COLUMN is_active SET DEFAULT false");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE users ALTER COLUMN is_active DROP DEFAULT");
    }

}

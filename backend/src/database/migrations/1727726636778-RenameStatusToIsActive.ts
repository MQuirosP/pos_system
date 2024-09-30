import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameStatusToIsActive1727726636778 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("users", "status", "is_active")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("users", "is_active", "status")
    }

}

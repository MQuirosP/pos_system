import { MigrationInterface, QueryRunner } from "typeorm";

export class TempMigration1727743150445 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("Hola Mario");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

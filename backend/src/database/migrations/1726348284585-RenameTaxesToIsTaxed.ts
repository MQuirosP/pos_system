import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTaxesToIsTaxed1726348284585 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('products', 'taxes', 'is_taxed');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('products', 'is_taxed', 'taxes');
    }

}

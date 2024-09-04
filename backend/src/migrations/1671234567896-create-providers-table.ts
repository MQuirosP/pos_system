import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProvidersTable1671234567896 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Providers',
            columns: [
                {
                    name: 'provider_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'provider_name',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                },
                {
                    name: 'provider_address',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'provider_phone',
                    type: 'varchar',
                    length: '20',
                    isNullable: true,
                },
                {
                    name: 'provider_email',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'provider_dni',
                    type: 'varchar',
                    length: '20',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Providers');
    }

}

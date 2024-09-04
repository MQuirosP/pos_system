import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePurchasesTable1671234567897 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Purchases',
            columns: [
                {
                    name: 'purchaseId',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'providerId',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'provider_name',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'paymentMethod',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'doc_number',
                    type: 'varchar',
                },
                {
                    name: 'sub_total',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: true,
                },
                {
                    name: 'taxes_amount',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'observations',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'total',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: true,
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

        await queryRunner.createForeignKey('Purchases', new TableForeignKey({
            columnNames: ['providerId'],
            referencedTableName: 'Providers',
            referencedColumnNames: ['provider_id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Purchases');
    }

}

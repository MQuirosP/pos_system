import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePurchaseItemsTable1671234567898 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'PurchaseItems',
            columns: [
                {
                    name: 'sequence',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'purchaseId',
                    type: 'int',
                },
                {
                    name: 'int_code',
                    type: 'varchar',
                },
                {
                    name: 'purchase_price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: true,
                },
                {
                    name: 'quantity',
                    type: 'float',
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
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'name',
                    type: 'varchar',
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
                    name: 'status',
                    type: 'varchar',
                    isNullable: true,
                },
            ],
        }), true);

        await queryRunner.createForeignKey('PurchaseItems', new TableForeignKey({
            columnNames: ['purchaseId'],
            referencedTableName: 'Purchases',
            referencedColumnNames: ['purchaseId'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }));

        await queryRunner.createForeignKey('PurchaseItems', new TableForeignKey({
            columnNames: ['int_code'],
            referencedTableName: 'Products',
            referencedColumnNames: ['int_code'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('PurchaseItems');
    }

}

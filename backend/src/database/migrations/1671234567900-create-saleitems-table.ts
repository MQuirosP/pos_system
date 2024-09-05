import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSaleItemsTable1671234567900 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'SaleItems',
            columns: [
                {
                    name: 'sequence',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'status',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'saleId',
                    type: 'int',
                },
                {
                    name: 'int_code',
                    type: 'varchar',
                },
                {
                    name: 'sale_price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: true,
                },
                {
                    name: 'quantity',
                    type: 'float',
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
                    name: 'total',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: true,
                },
            ],
        }), true);

        // If you have a `Sales` and `Products` table and want to create foreign keys, uncomment the following lines
        await queryRunner.createForeignKey('SaleItems', new TableForeignKey({
            columnNames: ['saleId'],
            referencedTableName: 'Sales',
            referencedColumnNames: ['saleId'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('SaleItems', new TableForeignKey({
            columnNames: ['int_code'],
            referencedTableName: 'Products',
            referencedColumnNames: ['int_code'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('SaleItems');
    }

}

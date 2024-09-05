import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductsTable1671234567895 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Products',
            columns: [
                {
                    name: 'productId',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'int_code',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'purchase_price',
                    type: 'decimal',
                    precision: 10,
                    scale: 5,
                    isNullable: true,
                },
                {
                    name: 'quantity',
                    type: 'decimal',
                    precision: 10,
                    scale: 5,
                    isNullable: true,
                },
                {
                    name: 'sale_price',
                    type: 'decimal',
                    precision: 10,
                    scale: 5,
                    isNullable: true,
                },
                {
                    name: 'taxes',
                    type: 'boolean',
                    isNullable: true,
                },
                {
                    name: 'margin',
                    type: 'decimal',
                    precision: 10,
                    scale: 5,
                    isNullable: true,
                },
                {
                    name: 'taxPercentage',
                    type: 'decimal',
                    precision: 10,
                    scale: 5,
                },
                {
                    name: 'category_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'category_name',
                    type: 'varchar',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Products');
    }

}

import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSalesTable1671234567899 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Sales',
            columns: [
                {
                    name: 'saleId',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'customerId',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'customer_name',
                    type: 'varchar',
                },
                {
                    name: 'paymentMethod',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'doc_number',
                    type: 'varchar',
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
                {
                    name: 'status',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'observations',
                    type: 'text',
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

        // If you have a `Customers` table and want to create a foreign key, uncomment the following lines
        await queryRunner.createForeignKey('Sales', new TableForeignKey({
            columnNames: ['customerId'],
            referencedTableName: 'Customers',
            referencedColumnNames: ['customer_id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Sales');
    }

}

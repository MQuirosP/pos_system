import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCustomersTable1671234567893 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Customers',
            columns: [
                {
                    name: 'customer_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'customer_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'customer_first_lastname',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'customer_second_lastname',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'customer_address',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'customer_phone',
                    type: 'varchar',
                    length: '20',
                },
                {
                    name: 'customer_email',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'customer_dni',
                    type: 'varchar',
                    length: '20',
                    isNullable: true,
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
        await queryRunner.dropTable('Customers');
    }

}

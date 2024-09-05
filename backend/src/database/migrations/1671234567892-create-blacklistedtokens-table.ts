import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBlacklistedTokensTable1671234567892 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Crear la tabla BlacklistedTokens
        await queryRunner.createTable(new Table({
            name: 'BlacklistedTokens',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'token',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'expiresAt',
                    type: 'timestamp',
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
        // Eliminar la tabla BlacklistedTokens
        await queryRunner.dropTable('BlacklistedTokens');
    }

}

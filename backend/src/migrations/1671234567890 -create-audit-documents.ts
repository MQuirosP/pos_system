import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAuditDocumentsTable1671234567890 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'AuditDocuments',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'doc_number',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'username',
                    type: 'varchar',
                },
                {
                    name: 'auditId',
                    type: 'int',
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
        await queryRunner.dropTable('AuditDocuments');
    }

}

import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAuditItemsTable1671234567891 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Crear la tabla AuditItems
        await queryRunner.createTable(new Table({
            name: 'AuditItems',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'adjusted_quantity',
                    type: 'decimal',
                    precision: 10, // Puedes ajustar la precisión según tus necesidades
                    scale: 2,     // Puedes ajustar la escala según tus necesidades
                },
                {
                    name: 'adjusted_amount',
                    type: 'decimal',
                    precision: 10, // Puedes ajustar la precisión según tus necesidades
                    scale: 2,     // Puedes ajustar la escala según tus necesidades
                },
                {
                    name: 'int_code',
                    type: 'varchar',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'purchase_price',
                    type: 'decimal',
                    precision: 10, // Puedes ajustar la precisión según tus necesidades
                    scale: 2,     // Puedes ajustar la escala según tus necesidades
                },
                {
                    name: 'category_id',
                    type: 'int',
                },
                {
                    name: 'category_name',
                    type: 'varchar',
                },
                {
                    name: 'doc_number',
                    type: 'varchar',
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

        // Crear la clave foránea
        await queryRunner.createForeignKey('AuditItems', new TableForeignKey({
            columnNames: ['doc_number'],
            referencedTableName: 'AuditDocuments',
            referencedColumnNames: ['doc_number'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      // Obtener la tabla 'AuditItems'
      const table = await queryRunner.getTable('AuditItems');
      
      // Verificar si la tabla existe antes de intentar eliminar la clave foránea
      if (table) {
          const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('doc_number') !== -1);
          if (foreignKey) {
              await queryRunner.dropForeignKey('AuditItems', foreignKey);
          }
      }
  
      // Eliminar la tabla
      await queryRunner.dropTable('AuditItems');
  }

}

import { type } from "os";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSaleItems1647916742956 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "sale_items",
            columns: [
                {
                    name: "sequence",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true, // Esto asegura que se genere automáticamente
                },
                {
                    name: "status",
                    type: "varchar",
                    isNullable: true,
                    default: "'completed'",
                },
                // Agrega el resto de las columnas aquí
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sale_items");
    }
}


import { type } from "os";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProvidersTable1727813847937 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
      new Table({
        name: "providers",
        columns: [
          {
            name: "provider_id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "provider_name",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "provider_address",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "provider_phone",
            type: "varchar",
            length: "20",
            isNullable: false,
          },
          {
            name: "provider_email",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "provider_dni",
            type: "varchar",
            length: "20",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("providers");
    }

}

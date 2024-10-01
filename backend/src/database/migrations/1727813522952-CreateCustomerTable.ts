import { type } from "os";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCustomerTable1727813522952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
      new Table({
        name: "customers",
        columns: [
          {
            name: "customer_id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "customer_name",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "customer_first_lastname",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "customer_second_lastname",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "customer_address",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "customer_phone",
            type: "varchar",
            length: "20",
            isNullable: true,
          },
          {
            name: "customer_email",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "customer_dni",
            type: "varchar",
            length: "20",
            isUnique: true,
            isNullable: true,
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
      }),
      true
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("customers", true);
    }

}

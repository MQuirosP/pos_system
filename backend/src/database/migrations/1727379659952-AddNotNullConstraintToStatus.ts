import { type } from "os";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNotNullConstraintToStatus1727379659952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.changeColumn(
      "sale_items",
      "status",
      new TableColumn({
        name: "status",
        type: "varchar",
        isNullable: false, // Asegúrate de que sea falso
        default: "'completed'", // Define el valor por defecto
      }),
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
      "sale_items",
      "status",
      new TableColumn({
        name: "status",
        type: "varchar",
        isNullable: true, // Permitir null en la reversión
        default: null, // Restablece el valor por defecto a null
      }),
    );
  }
    }



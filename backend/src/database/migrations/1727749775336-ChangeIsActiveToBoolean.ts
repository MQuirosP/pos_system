import { query } from "express";
import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateIsActiveColumn1727729586759 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Eliminar el valor predeterminado actual para permitir el cambio de tipo
        await queryRunner.query(`
            ALTER TABLE users 
            ALTER COLUMN is_active DROP DEFAULT
        `);

        // 2. Cambiar temporalmente el tipo a 'text'
        await queryRunner.query(`
            ALTER TABLE users 
            ALTER COLUMN is_active TYPE text USING is_active::text
        `);

        // 3. Cambiar el tipo a 'boolean' con conversión de valores utilizando CASE
        await queryRunner.query(`
            ALTER TABLE users 
            ALTER COLUMN is_active TYPE boolean USING 
            CASE 
                WHEN is_active = 'active' THEN true 
                ELSE false 
            END
        `);

        // 4. Establecer el valor predeterminado como 'false'
        await queryRunner.query(`
            ALTER TABLE users 
            ALTER COLUMN is_active SET DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revertir el valor predeterminado
        await queryRunner.query(`
            ALTER TABLE users 
            ALTER COLUMN is_active DROP DEFAULT
        `);

        // Cambiar de nuevo a 'text' para facilitar la conversión
        await queryRunner.query(`
            ALTER TABLE users 
            ALTER COLUMN is_active TYPE text USING 
            CASE 
                WHEN is_active = true THEN 'active' 
                ELSE 'inactive' 
            END
        `);

        // Revertir el tipo original a 'enum' (users_is_active_enum)
        await queryRunner.query(`
            CREATE TYPE users_is_active_enum AS ENUM ('active', 'inactive');
        `);

        await queryRunner.query(`
            ALTER TABLE users 
            ALTER COLUMN is_active TYPE users_is_active_enum USING is_active::users_is_active_enum
        `);

        // Restaurar el valor predeterminado anterior (si existía uno)
        await queryRunner.query(`
            ALTER TABLE users 
            ALTER COLUMN is_active SET DEFAULT 'inactive';
        `);
    }
}


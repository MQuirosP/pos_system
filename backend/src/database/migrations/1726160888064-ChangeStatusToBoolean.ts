import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserFieldsToNotNull1680000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Verificar si la restricción CHECK para los campos de texto ya existe
        const constraints = await queryRunner.query(`
            SELECT constraint_name
            FROM information_schema.table_constraints
            WHERE table_name = 'users'
              AND constraint_type = 'CHECK';
        `);

        const existingConstraints = constraints.map((constraint: { constraint_name: string }) => constraint.constraint_name);

        // Agregar restricciones CHECK si no existen
        if (!existingConstraints.includes('check_username_not_empty')) {
            await queryRunner.query(`
                ALTER TABLE users
                    ADD CONSTRAINT check_username_not_empty CHECK (username <> '');
            `);
        }

        if (!existingConstraints.includes('check_name_not_empty')) {
            await queryRunner.query(`
                ALTER TABLE users
                    ADD CONSTRAINT check_name_not_empty CHECK (name <> '');
            `);
        }

        if (!existingConstraints.includes('check_lastname_not_empty')) {
            await queryRunner.query(`
                ALTER TABLE users
                    ADD CONSTRAINT check_lastname_not_empty CHECK (lastname <> '');
            `);
        }

        if (!existingConstraints.includes('check_password_not_empty')) {
            await queryRunner.query(`
                ALTER TABLE users
                    ADD CONSTRAINT check_password_not_empty CHECK (password <> '');
            `);
        }

        // Asegurar que los campos no permitan valores nulos
        await queryRunner.query(`
            ALTER TABLE users
                ALTER COLUMN username SET NOT NULL,
                ALTER COLUMN name SET NOT NULL,
                ALTER COLUMN lastname SET NOT NULL,
                ALTER COLUMN password SET NOT NULL,
                ALTER COLUMN role SET NOT NULL,
                ALTER COLUMN status SET NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar restricciones CHECK para los campos de texto si existen
        const constraints = await queryRunner.query(`
            SELECT constraint_name
            FROM information_schema.table_constraints
            WHERE table_name = 'users'
              AND constraint_type = 'CHECK';
        `);

        const existingConstraints = constraints.map((constraint: { constraint_name: string }) => constraint.constraint_name);

        if (existingConstraints.includes('check_username_not_empty')) {
            await queryRunner.query(`
                ALTER TABLE users
                    DROP CONSTRAINT check_username_not_empty;
            `);
        }

        if (existingConstraints.includes('check_name_not_empty')) {
            await queryRunner.query(`
                ALTER TABLE users
                    DROP CONSTRAINT check_name_not_empty;
            `);
        }

        if (existingConstraints.includes('check_lastname_not_empty')) {
            await queryRunner.query(`
                ALTER TABLE users
                    DROP CONSTRAINT check_lastname_not_empty;
            `);
        }

        if (existingConstraints.includes('check_password_not_empty')) {
            await queryRunner.query(`
                ALTER TABLE users
                    DROP CONSTRAINT check_password_not_empty;
            `);
        }

        // Restaurar restricciones NULL para otros campos si es necesario
        await queryRunner.query(`
            ALTER TABLE users
                ALTER COLUMN username DROP NOT NULL,
                ALTER COLUMN name DROP NOT NULL,
                ALTER COLUMN lastname DROP NOT NULL,
                ALTER COLUMN password DROP NOT NULL,
                ALTER COLUMN role DROP NOT NULL,
                ALTER COLUMN status DROP NOT NULL;
        `);
    }
}


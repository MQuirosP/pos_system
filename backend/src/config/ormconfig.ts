import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        process.env.NODE_ENV === 'production'
            ? './dist/database/entities/*.js'
            : './src/database/entities/*.ts'
    ],
    migrations: [
        process.env.NODE_ENV === 'production'
            ? './dist/database/migrations/*.js'
            : './src/database/migrations/*.ts'
    ],
    synchronize: process.env.NODE_ENV !== 'production',
});

export default dataSource;

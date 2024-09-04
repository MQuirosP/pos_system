import { DataSource, Migration } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Asegúrate de que este esté en la primera línea del archivo

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [], // Asegúrate de agregar tus entidades aquí
  migrations: ['./dist/migrations/*.js'], // Asegúrate de agregar tus migraciones aquí
  synchronize: true,
});

export default dataSource;

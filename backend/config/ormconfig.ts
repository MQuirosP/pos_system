import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Asegúrate de que este esté en la primera línea del archivo

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    process.env.NODE_ENV === 'production' 
      ? './dist/entities/*.js' 
      : './src/entities/*.ts'
  ],
  migrations: [
    process.env.NODE_ENV === 'production' 
      ? './dist/migrations/*.js' 
      : './src/migrations/*.ts'
  ],
  synchronize: process.env.NODE_ENV !== 'production',
});

export default dataSource;

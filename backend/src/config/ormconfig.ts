import { DataSource } from "typeorm";

// Verificamos si estamos en desarrollo o producción
const isDevelopment = process.env.NODE_ENV !== "production";
if (isDevelopment) {
  console.log("Running in development mode.");
} else {
  console.log("Running in production mode.");
}
// Configursamos la conexión a la base de datos
const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    // Especificamos la ruta de las entidades dependiendo del entorno
    isDevelopment
      ? "@entities/*.ts"
      : "@entities/*.js",
  ],
  migrations: [
    // Especificamos la ruta de las migraciones dependiendo del entorno
    isDevelopment
      ? "@migrations/*.ts"
      : "@migrations/*.js",
  ],
  synchronize: false, // Habilitamos sincronización solo en desarrollo
  logging: process.env.LOGGER_LEVEL === "debug", // Activamos el logging según el nivel configurado
  logger: "advanced-console",
});

export default dataSource;

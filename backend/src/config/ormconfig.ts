import { DataSource } from "typeorm";
// import * as dotenv from "dotenv";
// import { Users } from "@entities/users.entity";
// import { UserModel } from "@models/User";
// import { Product } from "@entities/products.entity";
// import { Purchase } from "@entities/purchases.entity";
// import { PurchaseItem } from "@entities/purchaseItems.entity";
// import { Sale } from "@entities/sales.entity";
// import { SaleItem } from "@entities/saleItems.entity";
// import { Customer } from "@entities/customers.entity";
// import { Provider } from "@entities/providers.entity";

// dotenv.config(); // Cargamos variables de entorno

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
    // Users,
    // UserModel,
    // Product,
    // Purchase,
    // PurchaseItem,
    // Sale,
    // SaleItem,
    // Customer,
    // Provider,
    // "src/database/entities/**/*.ts",
    // Especificamos la ruta de las entidades dependiendo del entorno
    isDevelopment
      ? "./src/database/entities/*.ts"
      : "./dist/database/entities/*.js",
  ],
  migrations: [
    // Especificamos la ruta de las migraciones dependiendo del entorno
    isDevelopment
      ? "./src/database/migrations/*.ts"
      : "./dist/database/migrations/*.js",
  ],
  synchronize: false, // Habilitamos sincronización solo en desarrollo
  logging: process.env.LOGGER_LEVEL === "debug", // Activamos el logging según el nivel configurado
  logger: "advanced-console",
});

export default dataSource;

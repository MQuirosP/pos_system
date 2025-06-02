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

// Verificamos si el código está siendo ejecutado desde /dist (compilado)
const isCompiled = __dirname.includes("dist");

// console.log(
//   isCompiled
//     ? "Ejecutando desde compilado (/dist)"
//     : "Ejecutando en desarrollo (/src)"
// );

// Configuramos la conexión a la base de datos
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
    isCompiled
      ? "./database/entities/*.js"
      : "./database/entities/*.ts",
  ],

  migrations: [
    isCompiled
      ? "./database/migrations/*.js"
      : "./database/migrations/*.ts",
  ],

  synchronize: false,
  logging: process.env.LOGGER_LEVEL === "debug",
  logger: "advanced-console",
});

export default dataSource;

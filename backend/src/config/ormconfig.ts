import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Users } from "../database/entities/users.entity";
import { UserModel } from "../database/models/User";
import { Product } from "../database/entities/products.entity";
import { Purchase } from "../database/entities/purchases.entity";
import { PurchaseItem } from "../database/entities/purchaseItems.entity";
import { Sale } from "../database/entities/sales.entity";
import { SaleItem } from "../database/entities/saleItems.entity";
import { Customer } from "../database/entities/customers.entity";
import { Provider } from "../database/entities/providers.entity";

dotenv.config(); // Cargar variables de entorno

// Verifica si estás en desarrollo o producción
const isDevelopment = process.env.NODE_ENV !== "production";

// Configuración de la conexión a la base de datos
const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    Users,
    UserModel,
    Product,
    Purchase,
    PurchaseItem,
    Sale,
    SaleItem,
    Customer,
    Provider,
    // Especificar la ruta de las entidades dependiendo del entorno
    isDevelopment
      ? "./src/database/entities/*.ts"
      : "./dist/database/entities/*.js",
  ],
  migrations: [
    // Especificar la ruta de las migraciones dependiendo del entorno
    isDevelopment
      ? "./src/database/migrations/*.ts"
      : "./dist/database/migrations/*.js",
  ],
  synchronize: isDevelopment, // Habilitar sincronización solo en desarrollo
  // dropSchema: true,
  logging: process.env.LOGGER_LEVEL === "debug", // Activar el logging según el nivel configurado
});

export default dataSource;

import express from 'express';
import users from '@routes/users.route';
import product from '@routes/products.route'
import sale from '@routes/sales.route'
import customer from "@routes/customers.route"
import provider from "@routes/providers.route"
import purchase from "@routes/purchases.route"
import { validatePutParams } from '@middlewares/validatePutParams';

const router = express.Router();

// router.use((req, res, next) => {
//   if (req.method === 'PUT') {
//     // Verifica si la ruta contiene un identificador numérico o string requerido
//     const idRegex = /\/\w+\/[^\/]+$/; // Esto asegura que haya algo después del último '/'
    
//     if (!idRegex.test(req.originalUrl)) {
//       return next(new AppError("A valid identifier is required in the URL for PUT requests.", 400));
//     }
//   }
  
//   next();
// });

// responsabilidad pasada al databaseErrorHandler
// router.use(validatePutParams)

router.use('/users', users);
router.use("/products", product);
router.use("/sales", sale);
router.use("/customers", customer);
router.use("/providers", provider);
router.use("/purchases", purchase);

export default router;


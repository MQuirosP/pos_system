import express from 'express';
import users from '@routes/users.route';
import product from '@routes/products.route';
import sale from '@routes/sales.route';
import customer from "@routes/customers.route";
import provider from "@routes/providers.route";
import purchase from "@routes/purchases.route";
import auth from "@routes/auth.route";
import { validatePutParams } from '@middlewares/validatePutParams.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

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

router.use(validatePutParams)

router.use('/users', authMiddleware, users);
router.use("/products", authMiddleware, product);
router.use("/sales", authMiddleware, sale);
router.use("/customers", authMiddleware, customer);
router.use("/providers", authMiddleware, provider);
router.use("/purchases", authMiddleware, purchase);
router.use("/auth", auth)

export default router;


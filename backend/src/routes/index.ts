import express from 'express';
import users from '@routes/users.route';
import product from '@routes/products.route';
import sale from '@routes/sales.route';
import customer from "@routes/customers.route";
import provider from "@routes/providers.route";
import purchase from "@routes/purchases.route";
import auth from "@routes/auth.route";
import category from "@routes/categories.route";
import { validateIdInUrl } from '@middlewares/validateIdParams.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = express.Router();

// router.use(validateIdInUrl)

router.use('/users', authMiddleware, users);
router.use("/products", authMiddleware, product);
router.use("/sales", authMiddleware, sale);
router.use("/customers", authMiddleware, customer);
router.use("/providers", authMiddleware, provider);
router.use("/purchases", authMiddleware, purchase);
router.use("/categories", authMiddleware, category)
router.use("/auth", auth)

export default router;


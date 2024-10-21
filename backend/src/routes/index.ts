import express from 'express';
import users from '@routes/users.route';
import product from '@routes/products.route'
import sale from '@routes/sales.route'
import customer from "@routes/customers.route"
import provider from "@routes/providers.route"
import purchase from "@routes/purchases.route"

const router = express.Router();

router.use('/users', users);
router.use("/products", product);
router.use("/sales", sale);
router.use("/customers", customer);
router.use("/providers", provider);
router.use("/purchases", purchase);

export default router;


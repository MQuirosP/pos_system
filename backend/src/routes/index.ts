import  express  from 'express';
import users from './users.route';
import product from './products.route'
import sale from './sales.route'
import customer from "./customers.route"

const router = express.Router();

router.use('/users', users);
router.use("/products", product);
router.use("/sales", sale);
router.use("/customers", customer)

export default router;


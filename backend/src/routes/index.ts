import  express  from 'express';
import users from './users.route';
import product from './products.route'

const router = express.Router();

router.use('/users', users);
router.use("/products", product)

export default router;


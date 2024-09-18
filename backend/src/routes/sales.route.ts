import  express  from 'express';
import { SaleController } from '../controllers/SaleController';


const router = express.Router();
const saleController = new SaleController();

router.post("/", saleController.createSale.bind(saleController));

export default router;
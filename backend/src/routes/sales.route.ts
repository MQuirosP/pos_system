import  express  from 'express';
import { SaleController } from '../controllers/SaleController';


const router = express.Router();
const saleController = new SaleController();

router.post("/", saleController.createSale.bind(saleController));
router.get("/", saleController.fetchAllSales.bind(saleController));
router.get("/:doc_number", saleController.fetchSaleByDocNumber.bind(saleController));

export default router;
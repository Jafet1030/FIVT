import express from 'express';
import { createSale, getAllSales} from '../controllers/saleCntrl.js';

const router = express.Router();

router.post("/create",createSale);
router.get("/allsales",getAllSales);



export {router as saleRoute}
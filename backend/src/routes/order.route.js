import {Router} from 'express';
import authUser from '../middlewares/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.post('/cod',authUser,placeOrderCOD);
orderRouter.get('/myOrder/:userId',getUserOrders)
orderRouter.get('/seller',authUser,getAllOrders)

export default orderRouter;

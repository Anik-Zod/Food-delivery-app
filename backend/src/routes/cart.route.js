import{Router} from 'express'
import { updateCart } from '../controllers/cart.controller.js';
import authUser from '../middlewares/authUser.js'

const cartRouter = Router();


cartRouter.put('/update',authUser,updateCart)

export default cartRouter;
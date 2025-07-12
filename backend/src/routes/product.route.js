import express from "express";

import { upload } from "../configs/multer.js";
import { addProduct, changeStock, getAllCategory, productByCategory, productById, productList } from "../controllers/product.controller.js";
import authSeller from "../middlewares/authSeller.js";

const productRouter = express.Router();

productRouter.post('/add',authSeller,upload.array('images'),addProduct)
productRouter.get('/list',productList);
productRouter.get('/list/:category',productByCategory);
productRouter.get('/getCategory',getAllCategory);
productRouter.get('/:id',productById);
productRouter.get('/stock',authSeller,changeStock);



export default productRouter;
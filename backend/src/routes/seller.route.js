import express from "express";
import { isSellerAuth, sellerLogin, sellerLogout } from "../controllers/seller.controller.js";


const sellerRouter = express.Router();

sellerRouter.post("/login", sellerLogin);
sellerRouter.get("/logout", sellerLogout);
sellerRouter.get("/auth", isSellerAuth);

export default sellerRouter;


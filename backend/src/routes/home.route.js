import { Router } from "express";
import { isAuth, login, logout, register } from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";

const homeRouter = Router();

homeRouter.post('/register',register)
homeRouter.post('/login',login)
homeRouter.get('/logout',authUser,logout)
homeRouter.get('/is-auth',authUser,isAuth)

export default homeRouter;

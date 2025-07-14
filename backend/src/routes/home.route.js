import { Router } from "express";
import { isAuth, login, logout, register } from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";
import { upload } from "../configs/multer.js";

const homeRouter = Router();

homeRouter.post('/register',upload.single('image'),register)
homeRouter.post('/login',login)
homeRouter.get('/logout',logout)
homeRouter.get('/is-auth',authUser,isAuth)

export default homeRouter;

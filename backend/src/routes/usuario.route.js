import { Router } from "express";
import { createUser, loginUser } from "../controller/usuario.controller.js";

const userRouter = Router();

userRouter.post('/cadastro', createUser);
userRouter.post('/login', loginUser);

export default userRouter;
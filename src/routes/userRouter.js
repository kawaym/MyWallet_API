import { Router } from 'express';
import { signIn, signUp } from '../controllers/userController.js';

const userRouter = Router();
userRouter.post('/login', signIn);
userRouter.post('/cadastro', signUp);
export default userRouter;
import { Router } from 'express';
import { signIn } from '../controllers/authController.js';

const authRouter = Router();
authRouter.post('/', signIn);
export default authRouter;
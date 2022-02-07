import { Router } from "express";
import { createTransaction, getTransaction } from "../controllers/transactionController.js";
import validateToken from "../middlewares/validateToken.js";

const transactionRouter = Router();
transactionRouter.use(validateToken);
transactionRouter.get('/historico', getTransaction);
transactionRouter.post('/historico', createTransaction);

export default transactionRouter;
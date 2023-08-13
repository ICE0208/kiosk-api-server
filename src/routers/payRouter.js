import express from "express";
import { approvePay, readyPay } from "../controllers/apiController";

const payRouter = express.Router();

payRouter.post("/ready", readyPay);
payRouter.post("/approve", approvePay);

export default payRouter;

import express from "express";
import {
  addOrder,
  getAllOrder,
  removeOrder,
} from "../controllers/orderController";

const orderRouter = express.Router();

orderRouter.post("/add", addOrder);
orderRouter.post("/remove", removeOrder);

orderRouter.post("/", getAllOrder);

export default orderRouter;

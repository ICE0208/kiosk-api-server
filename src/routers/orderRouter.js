import express from "express";
import {
  addOrder,
  changeOrderStatus,
  dayOrder,
  getAllOrder,
  removeOrder,
} from "../controllers/orderController";

const orderRouter = express.Router();

orderRouter.post("/add", addOrder);
orderRouter.post("/remove", removeOrder);
orderRouter.post("/changeStatus", changeOrderStatus);
orderRouter.post("/dayOrder", dayOrder);

orderRouter.post("/", getAllOrder);

export default orderRouter;

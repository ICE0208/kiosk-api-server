import express from "express";
import { addMenu, getAllMenu, removeMenu } from "../controllers/menuController";

const menuRouter = express.Router();

menuRouter.post("/add", addMenu);
menuRouter.post("/remove", removeMenu);
menuRouter.get("/", getAllMenu);

export default menuRouter;

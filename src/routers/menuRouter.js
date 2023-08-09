import express from "express";
import {
  addMenu,
  getAllMenu,
  getCategoryMenu,
  getNameMenu,
  removeMenu,
} from "../controllers/menuController";

const menuRouter = express.Router();

menuRouter.post("/add", addMenu);
menuRouter.post("/remove", removeMenu);

menuRouter.post("/category", getCategoryMenu);
menuRouter.post("/name", getNameMenu);
menuRouter.post("/", getAllMenu);

export default menuRouter;

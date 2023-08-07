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

menuRouter.get("/category", getCategoryMenu);
menuRouter.get("/name", getNameMenu);
menuRouter.get("/", getAllMenu);

export default menuRouter;

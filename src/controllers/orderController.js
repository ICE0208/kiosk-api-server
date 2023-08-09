import { async } from "regenerator-runtime";
import Order from "../models/Order";
import User from "../models/User";
import { getVerifiedUser } from "./userController";

export const addOrder = async (req, res) => {
  const { id, password } = req.body;
  const { name, tableNum } = req.body;

  const verifiedUser = await getVerifiedUser(id, password);
  if (!verifiedUser) {
    return res.status(400).json({ ok: false, msg: "wrong id or pw" });
  }

  const popuUser = await User.findOne({ id })
    .populate("orders")
    .populate("menus");
  let menuList = popuUser.menus;
  menuList = menuList.filter((menu) => {
    return String(menu.name) === String(name);
  });
  if (menuList.length === 0) {
    return res
      .status(400)
      .json({ ok: false, msg: "There is not this name's menu." });
  }

  try {
    const order = await Order.create({
      owner: verifiedUser._id,
      menu: menuList[0]._id,
      tableNum,
    });
    await verifiedUser.orders.push(order._id);
    await verifiedUser.save();
    return res.status(200).json({ ok: true, msg: "good" });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: "error" });
  }
};

export const removeOrder = async (req, res) => {
  const { id, password } = req.body;
  const { orderId } = req.body;

  const verifiedUser = await getVerifiedUser(id, password);
  if (!verifiedUser) {
    return res.status(400).json({ ok: false, msg: "wrong id or pw" });
  }

  try {
    let order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(400).json({ ok: false, msg: "can't find by this id" });
    }
    order = await Order.findOne({ _id: orderId }).populate("owner");
    order.owner.orders = order.owner.orders.filter((_id) => {
      console.log(_id);
      return String(_id) !== String(orderId);
    });
    await order.owner.save();
    await Order.findByIdAndDelete(orderId);
    return res.status(200).json({ ok: true, msg: "good" });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error });
  }
};

export const getAllOrder = async (req, res) => {
  const { id, password } = req.body;
  const verifiedUser = await getVerifiedUser(id, password);
  if (!verifiedUser) {
    return res.status(400).json({ ok: false, msg: "wrong id or pw" });
  }

  const popuUser = await User.findOne({ id })
    .populate({
      path: "orders",
      populate: {
        path: "menu",
      },
    })
    .exec();
  return res.status(200).json({ ok: true, data: { orders: popuUser.orders } });
};

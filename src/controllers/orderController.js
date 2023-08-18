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
    if (!verifiedUser.orders.includes(orderId)) {
      return res
        .status(400)
        .json({ ok: false, msg: "can't find this id in this account" });
    }

    let order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(400).json({ ok: false, msg: "can't find this id" });
    }
    order = await Order.findOne({ _id: orderId }).populate("owner");
    order.owner.orders = order.owner.orders.filter((_id) => {
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
    return res
      .status(400)
      .json({ ok: false, msg: "wrong id or pw", data: { orders: [] } });
  }

  const popuUser = await User.findOne({ id })
    .populate({
      path: "orders",
      populate: {
        path: "menu",
      },
    })
    .exec();
  return res
    .status(200)
    .json({ ok: true, msg: "good", data: { orders: popuUser.orders } });
};

export const changeOrderStatus = async (req, res) => {
  const { id, password } = req.body;
  const { orderId, status } = req.body;

  if (status !== -1 && status !== 0 && status !== 1) {
    return res
      .status(400)
      .json({ ok: false, msg: "Status can only be one of -1, 0, 1" });
  }

  const verifiedUser = await getVerifiedUser(id, password);
  if (!verifiedUser) {
    return res.status(400).json({ ok: false, msg: "wrong id or pw" });
  }

  try {
    if (!verifiedUser.orders.includes(orderId)) {
      return res
        .status(400)
        .json({ ok: false, msg: "can't find this id in this account" });
    }

    let order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(400).json({ ok: false, msg: "can't find this id" });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({ ok: true, msg: "good" });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error });
  }
};

export const dayOrder = async (req, res) => {
  const { year, month, day } = req.body;

  if (!year || !month || !day) {
    res
      .status(400)
      .json({ ok: false, msg: "연도, 월, 일이 필요합니다.", data: {} });
    return;
  }

  const { id, password } = req.body;
  const verifiedUser = await getVerifiedUser(id, password);
  if (!verifiedUser) {
    return res.status(400).json({ ok: false, msg: "wrong id or pw", data: {} });
  }

  // JavaScript의 Date 객체는 월을 0부터 시작하므로 -1을 해줘야 함
  const fromDate = new Date(Date.UTC(year, month - 1, day)); // UTC 기준
  const toDate = new Date(fromDate);

  // UTC 기준으로 하루를 더한 후 KST로 전환합니다.
  toDate.setDate(toDate.getDate() + 1);

  // console.log(`${fromDate} ~ ${toDate}`);

  try {
    const user = await User.findOne({ id })
      .populate({
        path: "orders",
        populate: {
          path: "menu",
        },
      })
      .exec();

    const { orders } = user;

    const filteredOrders = orders.filter((order) => {
      const createdAt = new Date(order.createdAt);
      return createdAt >= fromDate && createdAt < toDate;
    });

    const nameCount = new Map();
    let totalPrice = 0;

    filteredOrders.forEach((order) => {
      // 완료 상태일 때만 되도록
      if (order.status != 1) {
        return;
      }
      if (order.menu) {
        const menuItem = order.menu;
        if (menuItem.name && menuItem.price) {
          // 이름 카운트
          if (nameCount.has(menuItem.name)) {
            nameCount.set(menuItem.name, nameCount.get(menuItem.name) + 1);
          } else {
            nameCount.set(menuItem.name, 1);
          }

          // 총 가격 계산
          totalPrice += menuItem.price;
        }
      }
    });

    const response = {
      count: Object.fromEntries(nameCount),
      totalPrice,
    };

    return res.status(200).json({ ok: true, msg: "good", data: response });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ ok: false, msg: err, data: {} });
  }
};

export const monthOrder = async (req, res) => {
  const { year, month } = req.body;

  if (!year || !month) {
    res
      .status(400)
      .json({ ok: false, msg: "연도, 월이 필요합니다.", data: {} });
    return;
  }

  const { id, password } = req.body;
  const verifiedUser = await getVerifiedUser(id, password);
  if (!verifiedUser) {
    return res.status(400).json({ ok: false, msg: "wrong id or pw", data: {} });
  }

  // JavaScript의 Date 객체는 월을 0부터 시작하므로 -1을 해줘야 함x
  const fromDate = new Date(Date.UTC(year, month - 1, 1)); // UTC 기준
  const toDate = new Date(
    Date.UTC(year + (month / 12 >= 1 ? 1 : 0), month % 12, 1)
  );

  // console.log(`${fromDate} ~ ${toDate}`);

  try {
    const user = await User.findOne({ id })
      .populate({
        path: "orders",
        populate: {
          path: "menu",
        },
      })
      .exec();

    const { orders } = user;

    const filteredOrders = orders.filter((order) => {
      const createdAt = new Date(order.createdAt);
      return createdAt >= fromDate && createdAt < toDate;
    });

    const nameCount = new Map();
    let totalPrice = 0;

    filteredOrders.forEach((order) => {
      // 완료 상태일 때만 되도록
      if (order.status != 1) {
        return;
      }
      if (order.menu) {
        const menuItem = order.menu;
        if (menuItem.name && menuItem.price) {
          // 이름 카운트
          if (nameCount.has(menuItem.name)) {
            nameCount.set(menuItem.name, nameCount.get(menuItem.name) + 1);
          } else {
            nameCount.set(menuItem.name, 1);
          }

          // 총 가격 계산
          totalPrice += menuItem.price;
        }
      }
    });

    const response = {
      count: Object.fromEntries(nameCount),
      totalPrice,
    };

    return res.status(200).json({ ok: true, msg: "good", data: response });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ ok: false, msg: err, data: {} });
  }
};

import { async } from "regenerator-runtime";
import { getVerifiedUser } from "./userController";
import Menu from "../models/Menu";
import User from "../models/User";

export const getAllMenu = async (req, res) => {
  const { id, password } = req.body;
  const verifiedUser = await getVerifiedUser(id, password);
  if (!verifiedUser) {
    return res.status(400).json({ ok: false, msg: "wrong id or pw" });
  }

  const popuUser = await User.findOne({ id }).populate("menus");
  console.log(popuUser);
  return res.status(200).json({ ok: true, data: { menus: popuUser.menus } });
};

export const addMenu = async (req, res) => {
  const { id, password } = req.body;
  const { name, text, price, imageURL, category1, category2 } = req.body;

  const verifiedUser = await getVerifiedUser(id, password);
  if (!verifiedUser) {
    return res.status(400).json({ ok: false, msg: "wrong id or pw" });
  }

  try {
    const menu = await Menu.create({
      owner: verifiedUser._id,
      name,
      text,
      price,
      imageURL,
      category1,
      category2,
    });
    await verifiedUser.menus.push(menu._id);
    await verifiedUser.save();
    return res.status(200).json({ ok: true, msg: "good" });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error });
  }
};

export const removeMenu = async (req, res) => {
  const { id, password } = req.body;
  const { name } = req.body;

  const verifiedUser = await getVerifiedUser(id, password);
  if (!verifiedUser) {
    return res.status(400).json({ ok: false, msg: "wrong id or pw" });
  }

  try {
    let menu = await Menu.findOne({ name });
    if (!menu) {
      return res.status(400).json({ ok: false, msg: "no menu" });
    }
    menu = await Menu.findOne({ name }).populate("owner");
    console.log(menu);

    const menuId = menu._id;

    menu.owner.menus = menu.owner.menus.filter((_id) => {
      console.log(_id);
      return String(_id) != String(menuId);
    });
    await menu.owner.save();
    await Menu.findByIdAndDelete(menuId);

    return res.status(200).json({ ok: true, msg: "good" });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: "error" });
  }
};

import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: { type: String, required: true },
});

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;

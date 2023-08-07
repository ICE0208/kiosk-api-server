import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  menus: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
  totalPrice: { type: Number, required: true },
  tableNum: { type: Number, required: true },
});

const Order = mongoose.model("Menu", orderSchema);
export default Order;

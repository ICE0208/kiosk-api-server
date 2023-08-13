import { async } from "regenerator-runtime";

export const readyPay = async (req, res) => {
  return res.status(200).json({ ok: true });
};

export const approvePay = async (req, res) => {
  return res.status(200).json({ ok: true });
};

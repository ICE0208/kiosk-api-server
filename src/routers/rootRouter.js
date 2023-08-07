import express from "express";

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
  return res.json({ msg: "good" });
});

export default rootRouter;

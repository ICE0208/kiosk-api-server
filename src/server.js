import express from "express";
import morgan from "morgan";
import moment from "moment-timezone";
import flash from "express-flash";
import userRouter from "./routers/userRouter";
import cors from "cors";
import menuRouter from "./routers/menuRouter";
import orderRouter from "./routers/orderRouter";

const app = express();

app.use(cors());
// "combined" 형식으로 로깅을 설정하고 한국 시간대로 시간을 포함시킵니다.
morgan.token("date", (req, res, tz) => {
  return moment().tz(tz).format("YYYY-MM-DD HH:mm:ss");
});

app.use(
  morgan("combined", {
    immediate: true,
    stream: {
      write: (message) => {
        console.log(message);
      },
    },
    format: ":date[Asia/Seoul] :method :url :status :response-time ms",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(flash());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Express 서버가 작동 중입니다!");
});
app.get("/test", (req, res) => {
  res.send("test Express 서버가 작동 중입니다!");
});
app.get("/user/login", (req, res) => {
  return res.send("post로 하세요");
});

// ! ----
app.use("/user", userRouter);
app.use("/menu", menuRouter);
app.use("/order", orderRouter);

export default app;

import express from "express";
import morgan from "morgan";
import flash from "express-flash";
import userRouter from "./routers/userRouter";
import cors from "cors";
import menuRouter from "./routers/menuRouter";

const app = express();
const logger = morgan("dev");

app.use(cors());
app.use(logger);
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
app.get("/wake-up", (req, res) => {
  return res.send(`<!DOCTYPE html>
  <html>
    <head>
      <title>엥</title>
    </head>
    <body>
      <h1>일어나세요. 용사여~</h1>
      <button onclick="showAlert()">일어나기</button>
  
      <script>
        function showAlert() {
          alert("싫은데요?");
        }
      </script>
    </body>
  </html>
  `);
});

// ! ----
app.use("/user", userRouter);
app.use("/menu", menuRouter);

export default app;

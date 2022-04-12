// モジュール読み込み
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);              // 双方向通信
const { PrismaClient } = require("@prisma/client"); // データベース関連
const prisma = new PrismaClient();

// サーバーポートの指定
const PORT = process.env.PORT || 8080;

// POSTの内容を受け取れるようにする
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// HTMLを返す
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// CSSを返す
app.get("/style.css", function (req, res) {
  res.sendFile(__dirname + "/style.css");
});

// client.jsを返す
app.get("/client.js", function (req, res) {
  res.sendFile(__dirname + "/client.js");
});

// 画像取得用
app.get("/images/lock", function (req, res) {
  res.sendFile(__dirname + "/images/lock.png");
});
app.get("/images/unlock", function (req, res) {
  res.sendFile(__dirname + "/images/unlock.png");
});

// 情報の受け取り・データの変更
app.post("/", async function (req, res) {

  // 新しい状態データの作成
  await prisma.status.create({
    data: {
      body: JSON.parse(req.body?.status),
    },
  });

  // 状態データの取得
  const status = await prisma.status.findMany();

  // 状態データの送信
  io.emit("event", status);

  // 変更があったことを知らせる
  res.send("status update!!");
});

// 双方向通信接続
io.on("connection", async function (socket) {
  // 状態データの取得
  const status = await prisma.status.findMany();
  // 状態データに値があれば送信
  if (status.length !== 0) socket.emit("event", status);

  // 受信しクライアントに送信
  socket.on("event", function (status) {
    io.emit("event", status);
  });
});

// サーバーの実行
http.listen(PORT, function () {
  console.log("server listening. Port:" + PORT);
});

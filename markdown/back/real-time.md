## [リアルタイム処理](./../back-end.md)
[Socket.IO](https://socket.io/) と言うライブラリを使用してリアルタイム処理を実装する

/app/app.js
```js
// モジュール読み込み
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
// データベース関連
const { PrismaClient } = require("@prisma/client"); 
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
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// CSSを返す
app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

// client.jsを返す
app.get("/client.js", (req, res) => {
  res.sendFile(__dirname + "/client.js");
});

// 画像を返す
app.get("/images/lock", (req, res) => {
  res.sendFile(__dirname + "/images/lock.png");
});
app.get("/images/unlock", (req, res) => {
  res.sendFile(__dirname + "/images/unlock.png");
});

// 情報の受け取り、データの変更
app.post("/", async (req, res) => {

  // 新しい状態データの作成
  const newState = await prisma.status.create({
    data: {
      body: JSON.parse(Boolean(Number(req.body?.status))),
    },
  });

  // 状態データの送信
  io.emit("event", newState);

  // 変更があったことを知らせる
  res.send("status update !");
});

// 双方向通信開始
io.on("connection", async (socket) => {
  // 状態データの取得
  const status = await prisma.status.findMany();
  // 状態データに値があれば送信
  if (status.length !== 0) socket.emit("event", status);
});

// サーバーの実行
http.listen(PORT, () => {
  console.log("server listening. Port:" + PORT);
});
```

### 参考リンク
- https://socket.io/get-started/chat
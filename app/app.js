// モジュール読み込み
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
// データベース関連
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS status");
  db.run(`CREATE TABLE IF NOT EXISTS status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    body BOOLEAN,
    created_at TIMESTAMP DEFAULT(DATETIME('now','localtime'))
  )`)
  const stmt = db.prepare('insert into status(body) VALUES (?)')

  for (let i = 0; i < 10; i++) {
    stmt.run(true)
  }

  stmt.finalize()

  db.each('SELECT * FROM status', (err, row) => {
    console.log(`${row.id}: ${row.body}: ${row.created_at}`)
  })
})

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
  const newState = await db.run(
    'insert into post (title, content, createdtime) values (?, ?, ?)',
  );

  // 状態データの送信
  io.emit("event", newState);

  // 変更があったことを知らせる
  res.send("status update !");
});

// 双方向通信開始
io.on("connection", async (socket) => {
  // 状態データの取得
  const status = []
  // 状態データに値があれば送信
  if (status.length !== 0) socket.emit("event", status);
});

// サーバーの実行
http.listen(PORT, () => {
  console.log("server listening. Port:" + PORT);
}); 
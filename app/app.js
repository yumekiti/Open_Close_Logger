// モジュール読み込み
const express = require("express");
const app = express();
app.use(express.json());
const http = require("http").Server(app);
const io = require("socket.io")(http);
// データベース関連
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

// データベースの初期化
db.serialize(() => {
  // テーブルがあれば削除
  db.run("DROP TABLE IF EXISTS items");
  // items テーブルの作成
  db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status BOOLEAN default 0,
    position TEXT,
    created_at TIMESTAMP DEFAULT(DATETIME('now','+9 hours'))
  )`);
});

// サーバーポートの指定
const PORT = process.env.PORT || 8080;

// POSTの内容を受け取れるようにする
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Hello, World! を返す
app.get("/hello", (req, res) => res.send("Hello, World!"));

// publicを返す
app.use("/", express.static("public"));

// 情報の受け取り、データの変更
app.post("/", (req, res) => {
  // データの受け取り
  const status = req.body.status;
  const position = req.body.position;

  // positionがない場合はエラー
  if (!position) {
    res.status(400).send("position is required");
    return;
  }

  // データの挿入
  db.run("INSERT INTO items (status, position) VALUES (?, ?)", status, position);

  // 最新状態データの送信
  db.all("SELECT * FROM items WHERE id = last_insert_rowid() LIMIT 1", (err, data) => {
    const value = data[0];
    // データの送信
    res.send(value);
    // 変更があったことを知らせる
    io.emit("event", value);
  });
});

// 双方向通信開始
io.on("connection", (socket) => {
  // 状態データの取得
  db.all("SELECT * FROM items LIMIT 150", (err, data) => {
    // 状態データに値があれば送信
    if (data.length !== 0) socket.emit("event", data);
  });
});

// サーバーの実行
http.listen(PORT, () => {
  console.log("server listening. Port:" + PORT);
});

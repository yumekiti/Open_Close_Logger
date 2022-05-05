// モジュール読み込み
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
// データベース関連
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  // テーブルがあれば削除
  db.run("DROP TABLE IF EXISTS status");
  // テーブルの作成
  db.run(`CREATE TABLE IF NOT EXISTS status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    body BOOLEAN,
    created_at TIMESTAMP DEFAULT(DATETIME('now','localtime'))
  )`)
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

// publicを返す
app.use('/', express.static('public'));

// 状態データの取得
app.get("/data", (req, res) => {
  // 状態データの取得
  db.all("SELECT * FROM status", (err, data) => {
    // 状態データに値があれば送信
    if (data.length !== 0) res.send(JSON.stringify(data));
    else res.send(['No data']);
  })
});

// 情報の受け取り、データの変更
app.post("/", (req, res) => {
  // 状態を取得
  const status = JSON.parse(Boolean(Number(req.body.status)))
  
  // 新しい状態データの作成
  const stmt = db.prepare('INSERT INTO status(body) VALUES (?)')
  stmt.run(status)
  stmt.finalize()

  // 状態データの送信
  db.all('SELECT * FROM status WHERE id = last_insert_rowid()', (err, data) => {
    // 変更があったことを知らせる
    res.send(data);
    io.emit("event", data);
  })
});

// 双方向通信開始
io.on("connection", (socket) => {
  // 状態データの取得
  db.all("SELECT * FROM status", (err, data) => {
    // 状態データに値があれば送信
    if (data.length !== 0) socket.emit("event", data);
  })
});

// サーバーの実行
http.listen(PORT, () => {
  console.log("server listening. Port:" + PORT);
});
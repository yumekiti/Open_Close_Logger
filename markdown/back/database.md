### [戻る](./../back-end.md)

# SQLiteを使いデータを登録してみよう

SQLite はサーバとして動作させるのではなく単独のアプリケーションとして動作させることが可能な関係データベース管理システム (RDBMS) です。

<br>

/app/app.js
```js
// モジュール読み込み
const express = require("express");
const app = express();
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
  })
});

// 状態データの取得
app.get("/data", (req, res) => {
  // 状態データの取得
  db.all("SELECT * FROM status", (err, data) => {
    // 状態データに値があれば送信
    if (data.length !== 0) res.send(JSON.stringify(data));
    else res.send(['No data']);
  })
});

// サーバーの実行
app.listen(PORT, () => {
  console.log("server listening. Port:" + PORT);
});
```

<br><br>

# 課題

- データを追加してみて反映されたか確認する
- 更新してもデータが消えないか確認する

<br>

## http://localhost:8080/test.html

---

<br><br>

## 参考リンク

- https://www.dbonline.jp/sqlite/
- https://ja.wikipedia.org/wiki/SQLite
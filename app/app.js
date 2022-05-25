// モジュール読み込み
const express = require("express");
const app = express();
const http = require("http").Server(app);

// サーバーポートの指定
const PORT = process.env.PORT || 8080;

// Hello, World! を返す
app.get("/hello", (req, res) => res.send("Hello, World!"));

// サーバーの実行
http.listen(PORT, () => {
  console.log("server listening. Port:" + PORT);
});

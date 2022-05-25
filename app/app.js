// モジュール読み込み
const express = require("express");
const app = express();
const http = require("http").Server(app);

// Hello, World! を返す

// サーバーの実行
http.listen(PORT, () => {
  console.log("server listening. Port:" + PORT);
});

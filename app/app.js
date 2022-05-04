// モジュール読み込み
const express = require("express");
const app = express();

// サーバーポートの指定
const PORT = process.env.PORT || 8080;

// publicを返す
app.use('/', express.static('public'));

// サーバーの実行
app.listen(PORT, () => {
  console.log("server listening. Port:" + PORT);
}); 
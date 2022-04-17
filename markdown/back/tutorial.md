## Expressを動かしてみよう

/app/app.js
```js
// モジュール読み込み
const express = require("express");
const app = express();
const http = require("http").Server(app);

// サーバーポートの指定
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// サーバーの実行
http.listen(PORT, () => {
  console.log("server listening. Port:" + PORT);
});
```
以下リンクに`Hello, World!`と表示される

http://localhost:8080
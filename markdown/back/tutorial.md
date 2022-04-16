## [Expressを動かしてみよう](./../back-end.md)
Expressとは、Web アプリケーションとモバイル・アプリケーション向けの一連の堅固な機能を提供する最小限で柔軟な Node.js Web アプリケーション・フレームワークです。

/app/app.js
```js
// モジュール読み込み
const express = require("express");
const app = express();

// サーバーポートの指定
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// サーバーの実行
app.listen(PORT, () => {
  console.log("server listening. Port:" + PORT);
});
```
以下リンクに`Hello, World!`と表示される

http://localhost:8080

### 参考リンク
- https://expressjs.com/ja/starter/hello-world.html
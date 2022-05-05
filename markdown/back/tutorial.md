### [戻る](./../back-end.md)

# Expressを動かしてみよう

Expressとは、Web アプリケーションとモバイル・アプリケーション向けの一連の堅固な機能を提供する最小限で柔軟な Node.js Web アプリケーション・フレームワークです。

<br>

/app/app.js
```js
// モジュール読み込み
const express = require("express");
const app = express();

// サーバーポートの指定
const PORT = process.env.PORT || 8080;

// Hello, World! を返す
app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

// サーバーの実行
app.listen(PORT, () => {
  console.log("server listening. Port:" + PORT);
});
```

<br><br>

# 課題

- 下記リンクに `Hello, World!` と表示されるか、確認する
- `Hello, World!` の部分を変更して反映されるか確認する

<br>

## http://localhost:8080

---

<br><br>

## 参考リンク

- https://expressjs.com/ja/starter/hello-world.html
### [戻る](./../back-end.md)

# HTML を表示してみよう

HTML (Hypertext Markup Language、ハイパーテキスト・マークアップ・ランゲージ)は、ウェブサイトのコンテンツの構造を作るために使うコードです。

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

// publicを返す
app.use("/", express.static("public"));

// サーバーの実行
app.listen(PORT, () => {
  console.log("server listening. Port:" + PORT);
});
```

/app/public/index.html

```html
<h1>Hello, World!!</h1>
```

<br><br>

# 課題

- 下記リンクに `Hello, World!!` と表示されるか、確認する
- `Hello, World!` の部分を変更して反映されるか確認する
- 好きな `HTML` を書いてみてみる

<br>

## http://localhost:8080

---

<br><br>

### 参考リンク

- https://expressjs.com/ja/starter/static-files.html
- https://developer.mozilla.org/ja/docs/Learn/Getting_started_with_the_web/HTML_basics

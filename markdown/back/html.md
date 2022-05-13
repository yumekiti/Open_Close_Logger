### [戻る](./../back-end.md)

# HTML を表示してみよう

HTML (Hypertext Markup Language、ハイパーテキスト・マークアップ・ランゲージ)は、ウェブサイトのコンテンツの構造を作るために使うコードです。

<br>

/app/app.js

```js
// publicを返す
app.use("/", express.static("public"));
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

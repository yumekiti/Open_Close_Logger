### [戻る](./../back-end.md)

# HTML を表示してみよう

HTML (Hypertext Markup Language、ハイパーテキスト・マークアップ・ランゲージ)は、ウェブサイトのコンテンツの構造を作るために使うコードです。

<br>

# 課題

- 下記リンクに `Hello, World!!` と表示されるか、確認する
- `Hello, World!` の部分を変更して反映されるか確認する

<br>

## http://localhost:8080/test.html

<br><br>

[/app/app.js](../../app/app.js)

```js
// publicを返す
app.use("/", express.static("public"));
```

/app/public/test.html

```html
<h1>Hello, World!!</h1>
```

---

<br><br>

### 参考リンク

- https://expressjs.com/ja/starter/static-files.html
- https://developer.mozilla.org/ja/docs/Learn/Getting_started_with_the_web/HTML_basics
